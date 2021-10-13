    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyBhR8yjzIt_Luz3XA8ydr19WYAqOQIaP_Q",
        authDomain: "monitorco2-c08d0.firebaseapp.com",
        databaseURL: "https://monitorco2-c08d0-default-rtdb.firebaseio.com",
        projectId: "monitorco2-c08d0",
        storageBucket: "monitorco2-c08d0.appspot.com",
        messagingSenderId: "696526889633",
        appId: "1:696526889633:web:3cf8257d85fe5303c246e0"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    import { getDatabase, ref, onValue, query, limitToLast } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-database.js";

    const db = getDatabase();
    const dbRef = query(ref(db, '/sensores/gas_inflamavel/'), limitToLast(1));

    let spanStatus = document.getElementById('status');
    let imgLoading = document.getElementById('loading');

    let divSinalVerde = document.getElementById('sinal-verde');
    let divSinalVermelho = document.getElementById('sinal-vermelho');

    const aTelefoneBombeiros = document.getElementById('telefone-bombeiros');

    let cores = {
        'amarelo_escuro': '#404000',
        'verde_escuro': '#004000',
        'vermelho_escuro': '#400000',
        'amarelo': 'yellow',
        'verde': '#00FF00',
        'vermelho': 'red'

    };

    onValue(dbRef, (snapshot) => {
        imgLoading.style = "display: none";
        snapshot.forEach((childSnapshot) => {
            const childKey = childSnapshot.key;
            const childData = childSnapshot.val();
            console.log("Chave: " + childKey);
            console.log("Valor: " + childData.detectado);
            exibeNiveisMonoxidoCarbono(childKey, childData.detectado);
        });
    });

    function acionaSinalVerde(msg){
        divSinalVerde.style.backgroundColor = cores['verde'];
        spanStatus.innerText = msg;
        aTelefoneBombeiros.style.display = 'none';
    }

    function acionaSinalVermelho(msg){
        divSinalVermelho.style.backgroundColor = cores['vermelho'];
        spanStatus.innerText = msg;
        aTelefoneBombeiros.style.display = 'inline-block';
    }

    function apagaTodosSinais(){
        divSinalVerde.style = 'background-color: ' + cores['verde_escuro'];
        divSinalVermelho.style = 'background-color: ' + cores['vermelho_escuro'];
    }

    function exibeNiveisMonoxidoCarbono(key, data) {
        apagaTodosSinais();
        let gasDetectado = data;

        if (gasDetectado == false){
            acionaSinalVerde("😉\nTudo bem!");
        } else {
            acionaSinalVermelho("😱\nGás inflamável detectado!");
        }
    }
