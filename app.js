window.addEventListener('load', () => {

    const pantalla = document.getElementById('pantalla'),
            contenedor = document.getElementById('ctnMain'),
            teclas = document.getElementById('ctnBtn'),
            mostrarH = document.getElementById('mostrarH'),
            historialT = document.getElementById('historialT'),
            historial = document.getElementById('historial'),
            body = document.getElementById('body');
    
    let memoria = 0, numero1, tipoOperacion, limpiarT = false, tempVal = "";
    const controlPorCursor = () => {
        if (!teclas)
            return;
        teclas.addEventListener('click', e => {
            const t = e.target,
                    d = t.dataset;
    
            if (d.numero)
                escribirEnPantalla(d.numero);
    
    
            if (d.simbolo)
                tipoOperacionF(d.simbolo);
    
            if (d.operacion)
               
                calcular(d.operacion);
        });
    };
    
    const controlPorTeclas = () => {
    
        body.addEventListener('keypress', e => {
            e.preventDefault();
            //screen.focus();
            const t = String.fromCharCode(e.keyCode);
            if (pantalla.innerHTML === "0" || pantalla.innerHTML.match(/[+*\/-]/g))
                pantalla.innerHTML = "";
    
            if (t.match(/[0-9.]/))
                escribirEnPantalla(t);
    
            if (t.match(/[+*\/-]/g))
                tipoOperacionF(t);
    
            if (e.keyCode === 13) {
                calcular("=");
    
            }
        });
    };
    
    const limpiarTemp = () => {
    
        (pantalla.innerHTML = '', limpiarT = false);
    
    };
    
    const escribirEnPantalla = numero => {
    
        limpiarT && numero !== "negative" && numero !== "."
                ? limpiarTemp()
                : limpiarT = false;
    
        if (pantalla.innerHTML.match(/[+*\/-]/g) && !pantalla.innerHTML.match(/[0-9]/g) && numero === '.')
            pantalla.innerHTML = '';
    
    
        pantalla.innerHTML.match(/[+*\/-]/g) && !pantalla.innerHTML.match(/[0-9]/g) && numero === '.'
                ? pantalla.innerHTML = '0.'
                :
                pantalla.innerHTML === '-' && numero === '.'
                ? pantalla.innerHTML = '-0' + numero
                :
                pantalla.innerHTML === '-0' && numero.match(/[0-9]/)
                ? pantalla.innerHTML = '-' + numero
                :
                numero === '.' && pantalla.innerHTML === ''
                ? pantalla.innerHTML = '0.'
                :
                numero === '.' && !pantalla.innerHTML.includes('.')
                ? pantalla.innerHTML += numero
                :
                numero.match(/[0-9]/) && pantalla.innerHTML !== '0'
                ? pantalla.innerHTML += numero
                :
                numero.match(/[0-9]/) && pantalla.innerHTML === '0'
                ? pantalla.innerHTML = numero
                :
                numero === "negative" && pantalla.innerHTML === '0'
                ? pantalla.innerHTML = "-0"
                :
                numero === 'negative' && !pantalla.innerHTML.includes('-')
                ? pantalla.innerHTML = ("-") + pantalla.innerHTML
                :
                numero === 'negative' && pantalla.innerHTML.includes('-')
                ? pantalla.innerHTML = pantalla.innerHTML.substring(1)
                :
                numero === 'read'
                ? (pantalla.innerHTML = memoria, true)
                : null;
    };
    
    let mostrar = true;
    
    
    mostrarH.onclick = () => {
        mostrar ?
                (historialT.style.display = 'block',
                        //   contenedor.style.float = 'right',
                        mostrar = false)
                :
                (historialT.style.display = 'none',
                        //   contenedor.style.float = 'none',
                        mostrar = true);
    
    
    };
    
    const tipoOperacionF = (operacion) => {
        tempVal += pantalla.innerHTML;
        tempVal += " " + operacion;
        limpiarT = true;
        operacion !== "m"
                ? (numero1 = Number(pantalla.innerHTML),
                        tipoOperacion = operacion, pantalla.innerHTML = operacion)
                : (memoria += Number(pantalla.innerHTML), historial.innerHTML += pantalla.innerHTML);
    };
    
    var numero2;
    const calcular = (operacion) => {
        const calculando = (numero1, tipoOperacion) => {
            numero2 = Number(pantalla.innerHTML);
            tempVal += " " + numero2;
            let resultado;
            switch (tipoOperacion) {
                case '+':
                    resultado = numero1 + numero2;
                    break;
                case '-':
                    resultado = numero1 - numero2;
                    break;
                case '*':
                    resultado = numero1 * numero2;
                    break;
                case '/':
                    resultado = numero1 / numero2;
                    break;
    
                default:
                    
                    break;
            }
    
            
    
            if (numero2) {
                pantalla.innerHTML = numero2;
            }
            if (numero1 && numero2) {
                resultado === "Infinity" || resultado === undefined
                    ? pantalla.innerHTML = "Error"
                    : pantalla.innerHTML = resultado;
                
                var newItem = document.createElement("p");
                var hr = document.createElement("hr");
                var textnode = document.createTextNode(tempVal + "=" + resultado);
                newItem.appendChild(textnode);
                newItem.appendChild(hr);
                historial.insertBefore(newItem, historial.childNodes[0]);
            }
    //            historial += tempVal + "= " + resultado + "<hr>";
    
            tempVal = "";
        };
    
        operacion === 'clear'
                ? (pantalla.innerHTML = '0', numero1=undefined, numero2= undefined)
                : calculando(numero1, tipoOperacion);
        limpiarT = true;
    };
    
    
    
    controlPorCursor();
    controlPorTeclas();
    
    
    });
    