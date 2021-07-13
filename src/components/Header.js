import React, { Fragment, useEffect } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from "react-redux"
import { selectUserName, setSignOut, setUserLogin } from '../features/user/userSlice'
import { auth, provider } from '../firebase'
import { useHistory } from 'react-router-dom'


const Header = () => {
    const userName = useSelector(selectUserName)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                dispatch(setUserLogin({
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL
                }))

                history.push("/")
            }
        })
    }, [dispatch, history])

    const signOut = () => {
        auth.signOut()
            .then(() => {
                dispatch(setSignOut())
                history.push("/Login")
            })
    }

    const signIn = () => {
        auth.signInWithPopup(provider)
            .then((result) => {
                dispatch(setUserLogin({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL
                }))

                history.push("/")
            })
    }

    return (
        <Nav>
            <Logo src="/images/logo.svg" />

            {
                !userName ? (
                    <LoginContainer>
                        <Login onClick={signIn}>LOGIN</Login>
                    </LoginContainer>) : (
                    <Fragment>
                        <NavMenu>
                            <a href="http://localhost:3000/">
                                <img src="/images/home-icon.svg" alt="" />
                                <span>HOME</span>
                            </a>
                            <a href="#foo">
                                <img src="/images/search-icon.svg" alt="" />
                                <span>SEARCH</span>
                            </a>
                            <a href="#foo">
                                <img src="/images/watchlist-icon.svg" alt="" />
                                <span>WATCHLIST</span>
                            </a>
                            <a href="#foo">
                                <img src="/images/original-icon.svg" alt="" />
                                <span>ORIGINALS</span>
                            </a>
                            <a href="#foo">
                                <img src="/images/movie-icon.svg" alt="" />
                                <span>MOVIES</span>
                            </a>
                            <a href="#foo">
                                <img src="/images/series-icon.svg" alt="" />
                                <span>SERIES</span>
                            </a>
                        </NavMenu>
                        <UserImg onClick={signOut} src="https://i.pinimg.com/236x/10/6e/c3/106ec30c1b4f950d419e29ffdbd26f67.jpg" alt="user" />
                    </Fragment>
                )
            }
        </Nav>
    )
}

const Nav = styled.nav`
    height: 70px;
    background: #090b13;
    display: flex;
    align-items: center;
    padding: 0 36px;
`

const Logo = styled.img`
    width: 80px;
`

const NavMenu = styled.div`
    display: flex;
    flex: 1;
    margin-left: 20px;
    align-items: center;
    a {
        display: flex;
        align-items: center;
        padding: 0 12px;
        color: white;
        text-decoration: none;
        cursor: pointer;

        img {
            height: 20px;
            margin-right: 5px;
        }

        span {
            font - size: 13px;
            letter-spacing: 1.42px;
            position: relative;

            &:after {
                content: "";
                height: 2px;
                background: white;
                position: absolute;
                left: 0;
                right: 0;
                bottom: -6px;
                opacity: 0;
                transform-origin: left center;
                transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
                transform: scaleX(0)
            }
        }

        &:hover {
            span:after {
                transform: scaleX(1);
                opacity: 1;
            }
        }
    }
`
const UserImg = styled.img`
    width: 48px;
    height: 48px;
    border-radius:50%;
    cursor: pointer;
`

const Login = styled.div`
    border: 1px solid #f9f9f9;
    padding: 8px 16px;
    border-radius: 4px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    background-color: rgba(0,0,0,0.6);
    cursor: pointer;
    transition: all 0.2s ease 0s;

    &:hover {
        background-color: #f9f9f9;
        color: #000;
        border-color: transparent;
    }
`

const LoginContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
`

export default Header
