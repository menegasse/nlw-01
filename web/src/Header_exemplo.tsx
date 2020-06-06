import React from 'react';

//define um tipo com parmametros para um componente 
interface HeaderProps{
    //quando se adiciona ? na frente do nome do parametro significa que ele não é obrigatório
    title: string;
}

//definindo o tipo de parametros do componente
const Header:   React.FC<HeaderProps> = (props) => {
    return(
        <header>
            <h1>{props.title}</h1>
        </header>
    );
}

export default Header;