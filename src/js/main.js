async function run() {
  try {
    // create a new session and load the AlexNet model.
    const session = await ort.InferenceSession.create(
      "./src/assets/efficientnet-B0-v1.onnx"
    );

    // prepare dummy input data
    const dims = [1, 3, 224, 224];
    const size = dims[0] * dims[1] * dims[2] * dims[3];
    const inputData = Float32Array.from({ length: size }, () => Math.random());

    // prepare feeds. use model input names as keys.
    const feeds = { input: new ort.Tensor("float32", inputData, dims) };

    // feed inputs and run
    const results = await session.run(feeds);
    console.log(results.output.data);
  } catch (e) {
    console.log(e);
  }
}
run();
