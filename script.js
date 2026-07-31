const MERMAID_CDN =
  'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
const MERMAID_TIMEOUT_MS = 10000;

function withTimeout(promise, ms) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`Timed out after ${ms}ms`));
    }, ms);

    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error) => {
        clearTimeout(timer);
        reject(error);
      }
    );
  });
}

async function initArchitectureDiagram() {
  const sketch = document.querySelector('.architecture-sketch');
  const source = document.querySelector('pre.mermaid');
  if (!sketch || !source) return;

  // Resting state is the text fallback (default-safe). Only upgrade on success.
  try {
    const { default: mermaid } = await withTimeout(import(MERMAID_CDN), MERMAID_TIMEOUT_MS);

    mermaid.initialize({
      startOnLoad: false,
      theme: 'dark',
      securityLevel: 'strict',
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        nodeSpacing: 70,
        rankSpacing: 72,
        curve: 'basis'
      },
      themeVariables: {
        background: '#111317',
        mainBkg: '#171a1f',
        primaryColor: '#171a1f',
        primaryTextColor: '#f4f4f5',
        primaryBorderColor: 'rgba(255,255,255,.16)',
        lineColor: '#34d399',
        secondaryColor: '#0d0f12',
        tertiaryColor: '#09090b',
        fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
        fontSize: '18px'
      }
    });

    // Mermaid cannot layout nodes that are display:none. Unhide for measurement
    // while keeping the text fallback visible until render succeeds.
    source.hidden = false;
    sketch.classList.add('diagram-rendering');

    // Allow layout to apply before measuring.
    await new Promise((resolve) => requestAnimationFrame(() => resolve()));

    await withTimeout(mermaid.run({ nodes: [source] }), MERMAID_TIMEOUT_MS);

    if (!source.querySelector('svg')) {
      throw new Error('Mermaid produced no SVG');
    }

    sketch.classList.remove('diagram-rendering');
    sketch.classList.add('diagram-ready');
  } catch (error) {
    console.warn('Architecture diagram unavailable; keeping text fallback.', error);
    sketch.classList.remove('diagram-rendering', 'diagram-ready');
    source.hidden = true;
  }
}

initArchitectureDiagram();
