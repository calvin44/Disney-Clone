import React, { useEffect } from 'react'
import styled from 'styled-components'
import ImgSlider from './ImgSlider'
import Movies from './Movies'
import Viewers from './Viewers'
import db from '../firebase'
import { useDispatch, useSelector } from 'react-redux'
import { setMovies } from '../features/movie/movieSlice'
import { selectUserName } from '../features/user/userSlice'
import { useHistory } from 'react-router'

const Home = () => {
    const dispatch = useDispatch()
    const userName = useSelector(selectUserName)
    const history = useHistory()


    useEffect(() => {
        if (!userName) {
            history.push("/Login")
        }

        db.collection('movies').onSnapshot((snapshot) => {
            const tempMovies = snapshot.docs.map((doc) => {
                return { id: doc.id, ...doc.data() }
            })
            dispatch(setMovies(tempMovies))
        })
    }, [dispatch, history, userName])

    return (
        <Container>
            <ImgSlider />
            <Viewers />
            <Movies />
        </Container>
    )
}

const Container = styled.main`
            min-height: calc(100vh - 70px);
            padding: 0 calc(3.5vw + 5px);
            position: relative;
            overflow-x: hidden;

            &:before {
                background: url("/images/home-background.png") center center / cover
            no-repeat fixed;
            content:"";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: -1;
    }
            `

export default Home
