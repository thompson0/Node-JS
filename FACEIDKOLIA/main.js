const cam = document.querySelector('#video');
const imageInput = document.querySelector("#image_input");
const nome = document.getElementById("#nome");
let uploadedImages = [];
let uploadedLabels = [];


Promise.all([
    faceapi.nets.ssdMobilenetv1.loadFromUri('https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js/weights'), 
    faceapi.nets.tinyFaceDetector.loadFromUri('https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js/weights'),
    faceapi.nets.faceLandmark68Net.loadFromUri('https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js/weights'),
    faceapi.nets.faceRecognitionNet.loadFromUri('https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js/weights'),
    faceapi.nets.faceExpressionNet.loadFromUri('https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js/weights'),
]).then(() => {
    console.log('Modelos carregados com sucesso.');
}).catch(err => console.error('Erro ao carregar modelos:', err));


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


function carregar(imageInput) {
    imageInput.addEventListener("change", async function() {
        uploadedImages = [];
        uploadedLabels = [];
        
        // Carregar imagens
        for (let i = 0; i < this.files.length; i++) {
            const reader = new FileReader();
            const fileName = this.files[i].name.split('.')[0];
            uploadedLabels.push(fileName);
            reader.addEventListener("load", () => {
                uploadedImages.push(reader.result);
                console.log(`Imagem carregada: ${fileName}`);
            });
            reader.readAsDataURL(this.files[i]);
        }

        // Espera carregar todas as imagens antes de continuar
        setTimeout(async () => {
            const labeledDescriptors = await loadLabeledImages();
            if (labeledDescriptors.length > 0) {
                console.log('Imagens carregadas com sucesso. Iniciando a câmera...');
                document.querySelector('#camera-section').style.display = 'block'; 
                startVideo(); // Iniciar a câmera
                iniciarDeteccao(labeledDescriptors);
            } else {
                console.error('Nenhum descritor de rosto foi carregado.');
            }
        }, 1000); 
    });
}

carregar(imageInput);


async function loadLabeledImages() {
    const labeledDescriptors = [];

    for (let i = 0; i < uploadedImages.length; i++) {
        const label = uploadedLabels[i]; 
        const imgData = uploadedImages[i]; 

        try {
            console.log(`Processando imagem para: ${label}`);
            const img = await faceapi.fetchImage(imgData);
            const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();

            if (detections) {
                const descriptor = detections.descriptor;
                labeledDescriptors.push(new faceapi.LabeledFaceDescriptors(label, [descriptor]));
                console.log(`Descritor adicionado para: ${label}`);
            } else {
                console.error(`Nenhum rosto detectado na imagem de ${label}.`);
            }
        } catch (error) {
            console.error(`Erro ao processar a imagem para ${label}:`, error);
        }
    }

    return labeledDescriptors;
}


function iniciarDeteccao(labeledDescriptors) {
    const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.6);

    cam.addEventListener('play', () => {
        const canvas = faceapi.createCanvasFromMedia(cam);
        document.body.append(canvas);

        const displaySize = { width: cam.width, height: cam.height };
        faceapi.matchDimensions(canvas, displaySize);

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
}

// Esconder a câmera até que as imagens sejam carregadas
document.querySelector('#camera-section').style.display = 'none';
console.log(nome)