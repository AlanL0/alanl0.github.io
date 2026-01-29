document.addEventListener(&#39;DOMContentLoaded&#39;, () =&gt; {
    // Click handlers for action circles
    document.getElementById(&#39;resume&#39;).addEventListener(&#39;click&#39;, () =&gt; {
        window.open(&#39;img/Master-Resume.pdf&#39;, &#39;_blank&#39;);
    });

    document.getElementById(&#39;contact&#39;).addEventListener(&#39;click&#39;, () =&gt; {
        window.location.href = &#39;mailto:alomo@uci.com&#39;;
    });

    document.getElementById(&#39;github-projects&#39;).addEventListener(&#39;click&#39;, () =&gt; {
        window.open(&#39;https://github.com/AlanL0&#39;, &#39;_blank&#39;);
    });

    // Logo modal functionality
    const bannerContainer = document.querySelector(&#39;.banner-container&#39;);
    const boxesGrid = document.getElementById(&#39;boxes-grid&#39;);
    const logoContainer = document.getElementById(&#39;logo-container&#39;);
    const logo = document.getElementById(&#39;logo&#39;);

    let showTimeout;

    const showLogoModal = () =&gt; {
        bannerContainer.style.opacity = &#39;0&#39;;
        bannerContainer.style.pointerEvents = &#39;none&#39;;
        boxesGrid.style.opacity = &#39;0&#39;;
        boxesGrid.style.pointerEvents = &#39;none&#39;;
        logoContainer.classList.remove(&#39;hidden&#39;);
        logo.classList.add(&#39;show-logo&#39;);
        
        showTimeout = setTimeout(hideLogoModal, 10000);
    };

    const hideLogoModal = () =&gt; {
        clearTimeout(showTimeout);
        bannerContainer.style.opacity = &#39;&#39;;
        bannerContainer.style.pointerEvents = &#39;&#39;;
        boxesGrid.style.opacity = &#39;&#39;;
        boxesGrid.style.pointerEvents = &#39;&#39;;
        logoContainer.classList.add(&#39;hidden&#39;);
        logo.classList.remove(&#39;show-logo&#39;);
    };

    bannerContainer.addEventListener(&#39;click&#39;, showLogoModal);
    logoContainer.addEventListener(&#39;click&#39;, hideLogoModal);

    // Smooth hover effects cleanup if needed
    const boxes = [&#39;resume&#39;, &#39;contact&#39;, &#39;github-projects&#39;];
    boxes.forEach(id =&gt; {
        const box = document.getElementById(id);
        box.addEventListener(&#39;mouseenter&#39;, () =&gt; {
            box.style.zIndex = &#39;10&#39;;
        });
        box.addEventListener(&#39;mouseleave&#39;, () =&gt; {
            box.style.zIndex = &#39;&#39;;
        });
    });
});