import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import '../../style/styles.css'

const Fader = ({text, fade}) => {
    const [fadeProp, setFadeProp] = useState({
        fade: 'fade-out',
    });

    useEffect(() => {
        const timeout = setInterval(() => {
            if(fadeProp.fade === 'fade-out'){
                setFadeProp({
                    fade:'fade-in'
                })
            }
            else {
                setFadeProp({
                    fade:'fade-in'
                })
            }
        },4000);
        return()  => clearInterval(timeout)
    }, [fadeProp])

    return (
        <>
            <span className={fadeProp.fade}>{text}</span>
        </>
    )
}
Fader.defaultProps = {
    text: 'Hata' 
}

Fader.propTypes = {
    text: PropTypes.string,
    param: PropTypes.string
}

export default Fader
