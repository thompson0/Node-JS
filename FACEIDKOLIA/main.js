const cam = document.querySelector('#video');

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js/weights'),
    faceapi.nets.faceLandmark68Net.loadFromUri('https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js/weights'),
    faceapi.nets.faceRecognitionNet.loadFromUri('https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js/weights'),
    faceapi.nets.faceExpressionNet.loadFromUri('https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js/weights'),
]).then(startVideo).catch(err => console.error('Erro ao carregar modelos:', err));

async function startVideo() {
    const constraints = { video: true };

    try {
        let stream = await navigator.mediaDevices.getUserMedia(constraints);
        cam.srcObject = stream;
        cam.onloadedmetadata = e => {
            cam.play();
        };
    } catch (err) {
        console.error('Erro ao acessar a câmera:', err);
    }
}

const imageInput = document.querySelector("#image_input");
let uploadedImages = [];

function carregar(imageInput) {
    imageInput.addEventListener("change", function() {
        uploadedImages = [];
        for (let i = 0; i < this.files.length; i++) {
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                uploadedImages.push(reader.result);
                console.log(uploadedImages);
            });
            reader.readAsDataURL(this.files[i]);
        }
    });
}

carregar(imageInput);

async function loadLabeledImages() {
    const labels = ['Thompson'];
    const descriptions = [];

    for (const label of labels) {
        for (let imgData of uploadedImages) {
            try {
                console.log(`Processando imagem para: ${label}`);
                const img = await faceapi.fetchImage(imgData);
                const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
                if (detections) {
                    descriptions.push(detections.descriptor);
                } else {
                    console.error(`Nenhum rosto detectado na imagem.`);
                }
            } catch (error) {
                console.error(`Erro ao carregar a imagem.`, error);
            }
        }
    }
    return new faceapi.LabeledFaceDescriptors(labels[0], descriptions);
}

cam.addEventListener('play', async () => {
    const canvas = faceapi.createCanvasFromMedia(cam);
    document.body.append(canvas);

    const displaySize = { width: cam.width, height: cam.height };
    faceapi.matchDimensions(canvas, displaySize);

    const labeledFaceDescriptors = await loadLabeledImages();
    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);

    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(
            cam,
            new faceapi.TinyFaceDetectorOptions()
        )
        .withFaceLandmarks()
        .withFaceDescriptors()
        .withFaceExpressions(); 

        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

        if (resizedDetections.length > 0) {
            faceapi.draw.drawDetections(canvas, resizedDetections);
            faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

            resizedDetections.forEach(detection => {
                const bestMatch = faceMatcher.findBestMatch(detection.descriptor);
                const box = detection.detection.box;
                const text = bestMatch.toString();

                const drawBox = new faceapi.draw.DrawBox(box, { label: text });
                drawBox.draw(canvas);
            });
        } else {
            console.log("Nenhuma detecção de rosto.");
        }
    }, 100);
});
