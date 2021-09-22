import React, { useState, useEffect } from 'react';
import { useToken } from './authContext';
import axios from 'axios';
import { parseISO, format } from 'date-fns';
import '../App.css';

const Home = () => {

    const {token, id, isAdmin, setToken} = useToken();
    const [lastArticles, setLastArticles] = useState([]);
    const [allArticles, setAllArticles] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [edit, setEdit] = useState(false);


    const getLastArticles = () => 
    {
        let config = {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        }
        axios.get('http://localhost:3001/home', config)
          .then(function (response) {
              console.log('response: ', response.data);
              setLastArticles(response.data);

          })
          .catch(function (error) {
            console.log(error);
        });
    }

    const getAllArticles = () => 
    {
        let config = {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        }
        axios.get('http://localhost:3001/articles', config)
          .then(function (response) {
              console.log('response: ', response.data);
              setAllArticles(response.data);

          })
          .catch(function (error) {
            console.log(error);
        });
    }

    useEffect(() => {

        getLastArticles();
        getAllArticles();
         
      }, [lastArticles, allArticles]); 

    const disconnect = () => {
        setToken(null);
    }

    const onDelete = (id) => {
        let config = {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        }
        axios.delete(`http://localhost:3001/articles/${id}`, config)
          .then(function (response) {
              console.log(response);
          })
          .catch(function (error) {
            console.log(error);
        });
    }

    const onEdit = (art) => {
        setTitle(art.title);
        setDescription(art.description);
        setContent(art.content);
        setShowForm(true);
        setEdit(true);
    }

    const onPostArticle = () => {

        let config = {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        }

        let datas = {
            title: title,
            description: description,
            content: content,
            user: id
        }

        if(edit) {
            axios.put(`http://localhost:3001/articles/${id}`, datas, config)
            .then(function (response) {
                console.log(response);
                setTitle('');
                setDescription('');
                setContent('');
                setShowForm(false);
                setEdit(false);
            })
            .catch(function (error) {
              console.log(error);
          });
        } else {
            axios.post("http://localhost:3001/articles", datas, config)
            .then(function (response) {
                console.log(response);
                setTitle('');
                setDescription('');
                setContent('');
                setShowForm(false);
                setEdit(false);
            })
            .catch(function (error) {
              console.log(error);
          });
        }

    }


    
    return (
        
        <div className='container-home'>
            <div className='header-container'>
                <h1 style={{color: 'white'}}>Bienvenue sur mon blog! </h1>
                <button onClick={disconnect} style={{backgroundColor: 'rgb(18, 18, 100)', color: 'white', border: 0, height: '30px', width: '120px'}}>Deconnexion</button>
            </div>

            <div>

                <div className='cards-container'>
                    {
                        lastArticles.map(a => 
                            <div className='card'>
                                <h3 className='text-style'>{a.title}</h3>
                                <div className='info-container'>
                                    <p className='text-style font-info'>auteur : {a.user ? a.user : 'anonyme'}</p>
                                    <p className='text-style font-info'>posté le : {format(parseISO(a.created_at),'dd/MM/yyyy')}</p>
                                </div>
                                <h4 className='text-style'> {a.description}</h4>
                                <p className='text-style'>{a.content}</p>
                            </div>
                        )
                    }
                </div>
                
            </div>

            {
                isAdmin ? (
                    <>
                        <button style={{backgroundColor: 'rgb(18, 18, 100)', color: 'white', border: 0, height: '30px', width: '120px', marginTop: '50px', marginBottom: '50px', fontSize: '16px'}} onClick={() => {setShowForm(true)}}>Ajouter</button>
                        <table>
                            <thead>
                                <tr>
                                    <td className='text-style cell-dimensions' style={{fontWeight: 'bold'}}>Titre</td>
                                    <td className='text-style cell-dimensions' style={{fontWeight: 'bold'}}>Date de création</td>
                                    <td className='text-style cell-dimensions' style={{fontWeight: 'bold'}}>Description</td>
                                    <td className='text-style cell-dimensions' style={{fontWeight: 'bold'}}>Actions</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allArticles.map(l =>
                                        <tr key={l.id}>
                                            <td className='text-style cell-dimensions'>{l.title}</td>
                                            <td className='text-style cell-dimensions'>{format(parseISO(l.created_at),'dd/MM/yyyy')}</td>
                                            <td className='text-style cell-dimensions'>{l.description}</td>
                                            <td className='text-style cell-dimensions'>
                                                <button style={{backgroundColor: 'rgb(18, 18, 100)', color: 'white', border: 0, height: '30px', width: '120px', marginRight: '3px'}} onClick={() => {onEdit(l)}}>Editer</button>
                                                <button style={{backgroundColor: 'rgb(18, 18, 100)', color: 'white', border: 0, height: '30px', width: '120px'}} onClick={() => {onDelete(l.id)}}>Supprimer</button>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </>
                ) : (
                    <></>
                )
            }

            {
                isAdmin && showForm === true ? (
                    <div className='a-form-container'>
                        <form className='form-article'>
                            <div className='label-container'>
                                <label className='text-white'>titre :</label>
                                <input className='text-white input-width' type="text" name="title" value ={title} onChange={event => setTitle(event.target.value)}/>
                            </div>

                            <div className='label-container'>
                                <label className='text-white'>Description : </label>
                                <input className='text-white input-width' type="text" name="description" value ={description} onChange={event => setDescription(event.target.value)}/>
                            </div>

                            <div className='label-container'>
                                <label className='text-white'>Contenu :</label>
                                <input className='text-white input-width' type="textarea" name="content" value ={content} onChange={event => setContent(event.target.value)}/>
                            </div>
                        </form>
                        <button style={{backgroundColor: 'rgb(18, 18, 100)', color: 'white', border: 0, height: '30px', width: '120px', fontSize: '15px', alignSelf: 'flex-end'}} onClick={() => {onPostArticle()}}>Valider</button>
                    </div>
                ) : (
                    <></>
                )
            }
            
        </div>

    )
}

    

export default Home;



