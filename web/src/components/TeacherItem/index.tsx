import React from 'react';


import whatsappIcon from '../../assets/images/icons/whatsapp.svg'
import './style.css'

function TeacherItem() {
    return (
        <article className="teacher-item">
            <header>
                <img src="https://avatars0.githubusercontent.com/u/39503968?s=460&u=3900177c59c7f2c6f3f7571b83b38a83703c278f&v=4" alt="Filipe Alves" />
                <div>
                    <strong>Filipe Alves</strong>
                    <span>Quimica</span>
                </div>
            </header>
            <p>
                Entusiasta das melhores tecnologias de quimica avançada
                        <br /><br />
                        Apaixonado por explodir coisas em laboratio e por Procurar um emprego
                    </p>
            <footer>
                <p>
                    Preço/hora
                            <strong>R$ 20,00</strong>
                </p>
                <button type="button">
                    <img src={whatsappIcon} alt="Entrar em contato" />
                            Entrar em contato
                        </button>
            </footer>
        </article>
    )
}

export default TeacherItem