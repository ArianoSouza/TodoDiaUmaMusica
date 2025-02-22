import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styles from './home.module.css'

export default function Home() {
    interface Musica {
        id: number;
        titulo: string;
        artista: string;
      }

    const [musicas, setMusicas] = useState();

    useEffect(() => {
        axios.get('http://localhost:5000/musicas')
          .then(response => {
            setMusicas(response.data);
            console.log(response.data)
          })
          .catch(error => {
            console.error('Erro ao buscar músicas:', error);
            console.log("não deu")
          });
      }, []);

    return (
    <>
    <div className={styles.container}>
        <img src="" alt="" />
        <h2 className={styles.titulo}>{musicas?.nome}</h2>
        <p className={styles.artist}>{musicas?.artista}</p>
    </div>
    </>
        

    );
  }