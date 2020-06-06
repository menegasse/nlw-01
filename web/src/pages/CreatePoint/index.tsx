import React, {useEffect, useState, ChangeEvent, FormEvent} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import {Map, TileLayer, Marker} from 'react-leaflet';
import {LeafletMouseEvent} from 'leaflet';
import api from '../../services/api';
import api_ibge from '../../services/api_ibge';
import Dropzone from '../../components/Dropzone';

import './styles.css';

import logo from '../../assets/logo.svg';

interface Item {
    id: number;
    title: string;
    image_url: string;
}

interface IBGEUFResponse {
    sigla: string;
}

interface IBGECityResponse {
    nome: string;
}

const CreatePoint = () => {
    //quando se cria um state para uma array ou objecto precisa se criar uma interface para indicar para o typscript o formato do state
    const [items, setItems] = useState<Item[]>([]);
    
    const [uf, setUfs] = useState<string[]>([]);
    const [selectedUf,setSelectedUf] = useState('0');

    const [cities,setCities] = useState<string[]>([]);
    const [selectedCity,setSelectedCity] = useState('0');

    const[initialPosition,setInitialPosition] = useState<[number,number]>([0,0]);
    const[selectedPosition,setSelectedPosition] = useState<[number,number]>([0,0]);

    const[formData,setFormData] = useState({
                                        name: '',
                                        email: '',
                                        whatsapp: ''
                                  });
    
    const [selectedItems,setSelectItems] = useState<number[]>([]);
    const [selectedFile,setSeletedFile] = useState<File>();

    //é utilizado para executar uma função em um determinado tempo
    // metodo tem dois parametro a função que vai ser executada e quando ela vai ser executada
    useEffect(()=>{
        api.get('/items').then(response => {
            setItems(response.data);
        });
    },[]);// quando passado um array vazio a função sera executada uma unica vez (assim que o componente for exibido em tela)

    useEffect(()=>{
        api_ibge.get<IBGEUFResponse[]>('')
                .then(response => {
                    const ufInitials = response.data.map( uf => uf.sigla);

                    setUfs(ufInitials);
                });
    },[]);

    useEffect(()=>{
        if(selectedUf !== '0'){
            api_ibge.get<IBGECityResponse[]>(`${selectedUf}/municipios`)
                    .then(response => {
                        const citiesNames = response.data.map( city => city.nome);

                        setCities(citiesNames);
                    });
        }
    },[selectedUf]);

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(postion => {
            const {latitude, longitude} = postion.coords;

            setInitialPosition([latitude,longitude]);
        });
    },[]);

    const history = useHistory();
    //precisa indicar para o typscript qual é o tipo do evento (ChangeEvent) e indicar qual o typo do elemento que está sendo alterado (HTMLSelectElement)
    function handleSelectUf(event: ChangeEvent<HTMLSelectElement>){
        setSelectedUf(event.target.value);
    }

    function handleSelectCity(event: ChangeEvent<HTMLSelectElement>){
        setSelectedCity(event.target.value);
    }

    function handleMapClick(event: LeafletMouseEvent){
        setSelectedPosition([
            event.latlng.lat,
            event.latlng.lng
        ]);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>){
        const {name,value} = event.target;

        /* o operador ... copia tudo o que tem na variavel       *\
        |* dessa forma não se sobrescreve valores novos do stado *|
        \* e altera apenas o campo nescessário no obejto         */

        setFormData({...formData, [name]: value})
    }

    function handleSelectItem(id: number){
        const alreadySelected = selectedItems.findIndex(item => item === id);

        if(alreadySelected >= 0){
            const filteredItems = selectedItems.filter(item=> item !== id);

            setSelectItems(filteredItems);
        }else{
            setSelectItems([...selectedItems,id]);
        }
    }

    async function handleSumbmit(event: FormEvent){
        event.preventDefault();

        const { name, email, whatsapp} = formData;

        const uf = selectedUf;

        const city = selectedCity;

        const [latitude,longitude] = selectedPosition;

        const items = selectedItems;

        const data = new FormData();

        
        data.append('name',name);
        data.append('email',email);
        data.append('whatsapp',whatsapp);
        data.append('uf',uf);
        data.append('city',city);
        data.append('latitude',String(latitude));
        data.append('longitude',String(longitude));
        data.append('items',items.join(','));
        
        if(selectedFile){
            data.append('image',selectedFile);
        }
        
        await api.post('points', data);

        alert('Ponto de coleta criado!');

        history.push('/');
    }

    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecoleta"/>

                <Link to="/">
                    <FiArrowLeft/>Voltar para home
                </Link>
            </header>

            <form onSubmit={handleSumbmit}>
                <h1>Cadastro do <br/> ponto de coleta</h1>

                <Dropzone onFileUploaded={setSeletedFile}/>
                
                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>

                    <div className="field">
                        <label htmlFor="name">Nome da entidade</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">E-mail</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <input
                                type="text"
                                name="whatsapp"
                                id="whatsapp"
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>

                    <Map center={initialPosition} zoom={15} onClick={handleMapClick}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        <Marker position={selectedPosition}/>
                    </Map>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado (UF)</label>
                            <select 
                                name="uf" 
                                id="uf" 
                                value={selectedUf} 
                                onChange={handleSelectUf}
                            >
                                <option value="0">Selecione um Uf</option>
                                {uf.map( uf => (
                                    <option key={uf} value={uf}>{uf}</option>
                                ))}                                
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select 
                                name="city" 
                                id="city"
                                value={selectedCity} 
                                onChange={handleSelectCity}
                            >
                                <option value="0">Selecione uma cidade</option>
                                {cities.map( city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}  
                            </select>
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Ítens de coleta</h2>
                        <span>Selecione um o mais ítens abaixo</span>
                    </legend>
                    <ul className="items-grid">
                        {items.map(item =>(
                            <li 
                                key={item.id} 
                                onClick={() => handleSelectItem(item.id)}
                                className={selectedItems.includes(item.id) ? 'selected': ''}
                            >
                                <img src={item.image_url} alt={item.title}/>
                                <span>{item.title}</span>
                            </li>
                        ))}
                    </ul>
                </fieldset>
                 
                 <button type="submit">
                     Cadastrar ponto de coleta
                 </button>
            </form>
        </div>
    );
};

export default CreatePoint;