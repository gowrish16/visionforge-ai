const testPrompts = [
  "provide the image of india",
  "generate the dogs",
  "A cinematic photograph of a futuristic city at night.",
  "A realistic golden retriever playing on a beach at sunset.",
  "A premium smartphone advertisement with a 10% festival offer.",
  "A fantasy castle floating above the clouds."
];

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function runTests() {
  console.log("=== Testing VisionForge AI Image Generation Pipeline ===");
  for (let i = 0; i < testPrompts.length; i++) {
    const prompt = testPrompts[i];
    console.log(`\n[Test ${i + 1}/${testPrompts.length}] Prompt: "${prompt}"`);
    try {
      const res = await fetch("http://127.0.0.1:3001/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, width: 512, height: 512, seed: 1000 + i })
      });

      if (!res.ok) {
        const text = await res.text();
        console.error(`FAILED: HTTP Status ${res.status} - ${text}`);
      } else {
        const buf = await res.arrayBuffer();
        console.log(`SUCCESS: HTTP 200 OK - Image Size: ${buf.byteLength} bytes`);
      }
    } catch (err) {
      console.error(`ERROR: ${err.message}`);
    }

    if (i < testPrompts.length - 1) {
      await sleep(1500);
    }
  }
  console.log("\n=== Test Suite Complete ===");
}

runTests();
