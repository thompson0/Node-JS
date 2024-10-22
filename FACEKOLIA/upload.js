const image_input = document.querySelector("#image_input")
var uploaded_image =[];


 function carregar(image_input) {
    image_input.addEventListener("change", function(){
       uploaded_image=[];
        for(let i = 0; i < this.files.length; i++){
            const reader = new FileReader();
            reader.addEventListener("load", ()=>{
               uploaded_image.push(reader.result);
               console.log(uploaded_image)
            });
            reader.readAsDataURL(this.files[i])
        }
    });
}

carregar(image_input)
