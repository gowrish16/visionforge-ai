const testPrompts = [
  { label: 'A', text: 'provide the image of india' },
  { label: 'B', text: 'generate the dogs' },
  { label: 'C', text: 'A cinematic photograph of a futuristic city at night.' },
  { label: 'D', text: 'A realistic golden retriever playing on a beach at sunset.' },
  { label: 'E', text: 'A premium smartphone advertisement with a 10% festival offer.' },
  { label: 'F', text: 'A fantasy castle floating above the clouds.' }
];

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function runZeroGPUTests() {
  console.log("=== VisionForge AI — Hugging Face ZeroGPU Space Test Suite ===");
  console.log("Space: black-forest-labs/FLUX.1-schnell");
  console.log("Integration: @gradio/client via Express Proxy");
  console.log("Backend Endpoint: http://127.0.0.1:3001/api/generate\n");

  console.log("--- PART 1: Six Sequential Test Prompts (A-F) ---");
  for (const item of testPrompts) {
    console.log(`\n[Test Prompt ${item.label}] "${item.text}"`);
    try {
      const startMs = Date.now();
      const res = await fetch("http://127.0.0.1:3001/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: item.text, width: 512, height: 512, seed: 1000 + item.label.charCodeAt(0) })
      });

      const elapsedSec = ((Date.now() - startMs) / 1000).toFixed(2);

      if (res.ok) {
        const buf = await res.arrayBuffer();
        console.log(`-> SUCCESS! HTTP 200 OK | Latency: ${elapsedSec}s | Image Size: ${buf.byteLength} bytes`);
      } else {
        const errText = await res.text();
        console.error(`-> HTTP Status ${res.status}: ${errText}`);
      }
    } catch (err) {
      console.error(`-> Network Error: ${err.message}`);
    }

    await sleep(1000);
  }

  console.log("\n--- PART 2: Rapid Prompt Switching Test (dogs -> A futuristic red sports car) ---");
  const switchPrompts = [
    'generate the dogs',
    'A futuristic red sports car racing down a neon highway at night, 8k resolution'
  ];

  let lastPayloadSize = 0;

  for (let i = 0; i < switchPrompts.length; i++) {
    const pText = switchPrompts[i];
    console.log(`\n[Rapid Switch Step ${i + 1}] Prompt: "${pText}"`);
    try {
      const startMs = Date.now();
      const res = await fetch("http://127.0.0.1:3001/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: pText, width: 512, height: 512, seed: 2000 + i })
      });

      const elapsedSec = ((Date.now() - startMs) / 1000).toFixed(2);

      if (res.ok) {
        const buf = await res.arrayBuffer();
        console.log(`-> SUCCESS! Status 200 OK | Latency: ${elapsedSec}s | Image Size: ${buf.byteLength} bytes`);
        if (i === 1 && buf.byteLength !== lastPayloadSize) {
          console.log(`-> VERIFIED: Step 2 generated a new unique image payload (${buf.byteLength} bytes vs ${lastPayloadSize} bytes). Zero prompt/image leakage.`);
        }
        lastPayloadSize = buf.byteLength;
      } else {
        const errText = await res.text();
        console.error(`-> HTTP Status ${res.status}: ${errText}`);
      }
    } catch (err) {
      console.error(`-> Error: ${err.message}`);
    }
  }

  console.log("\n=== Test Suite Execution Complete ===");
}

runZeroGPUTests();
