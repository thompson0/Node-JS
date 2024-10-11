//CHAMAR CAMERA DO HTML
const cam = document.querySelector('#video');

//PUXAR O MODELOS DA INTERNET PORQUE O LOCAL NAO TAVA FUNCIONANDO AI DEPOIS DE PUXAR LIGAR A CAMERA
Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js/weights'),
    faceapi.nets.faceLandmark68Net.loadFromUri('https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js/weights'),
    faceapi.nets.faceRecognitionNet.loadFromUri('https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js/weights'),
    faceapi.nets.faceExpressionNet.loadFromUri('https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js/weights'),
    faceapi.nets.ssdMobilenetv1.loadFromUri('https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js/weights')
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

//FACE RECONIGTION PARA ADICIONAR MAIS PESSOAS SO ADICIONAR MAIS UMA PASTA COM NOME DA PESSOA NA ARRAY E NA PASTA LABELS (MINIMO DE FOTOS 2, CASO  QUEIRA COLOCAR MAISS FOTOS PARAN UM PRECISAO MELHOR AUMENTE O NUMERO MAXIMO NO LOOP ABAIXO)

async function loadLabeledImages() {
    const labels = ['Thompson','Kaneto','JV','Guilherme','Nibo','Thomas'];
    return Promise.all(
        labels.map(async label => {
            const descriptions = [];
            for (let i = 1; i <= 2; i++) {
                try {
                    console.log(`Processando: ${label}/${i}.jpg`);
                    const img = await faceapi.fetchImage(`/labels/${label}/${i}.jpg`);
                    const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
                    if (detections) {
                        descriptions.push(detections.descriptor);
                    } else {
                        console.error(`Nenhum rosto detectado na imagem: ${label}/${i}.jpg`);
                    }
                } catch (error) {
                    console.error(`Erro ao carregar a imagem: ${label}/${i}.jpg`, error);
                }
            }
            return new faceapi.LabeledFaceDescriptors(label, descriptions);
        })
    );
}

//DESENHOS NO ROSTO NÁO TIREI PQ TAVA DANDO ERRADO FODASE DEPOIS EU VEJO

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
