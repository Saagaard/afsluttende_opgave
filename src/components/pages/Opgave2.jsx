import { useState, useEffect} from 'react'
import { PuffLoader } from 'react-spinners'
import parse from 'html-react-parser'

// API-kald
import {hentAbout} from '../helpers/aboutus'
import {hentGallery} from '../helpers/galleryitems'
import {hentReviews} from '../helpers/reviews'


const Opgave2 = () => {

    // STATE
    const [aboutus, setAboutus] = useState()           // til at rumme data fra API'et
    const [gallery, setGallery] = useState()           // til at rumme data fra API'et
    const [reviews, setReviews] = useState()
    const [loading, setLoading] = useState(false)    // true når vi venter på data fra API'et
    const [fejl, setFejl] = useState(false)          // true når vi får fejl-svar fra API'et
    const [fejl2, setFejl2] = useState(false)          // true når vi får fejl-svar fra API'et
    const [slider, setSlider] = useState(0)

    // Opkald til API'et når component er loadet
    useEffect(() => {
        
        //Kald api'et - og gem data i state + håndterer load og fejl
        setLoading(true)

        hentAbout().then( data => { 

            if ( data ) {
                // Det er gået godt = data
                console.log( data )
                setAboutus(data); // put data fra api'et i state
                setFejl(false); // nulstil en evt. tidligere fejl

            } else {
                // Det gik ikke så godt = fejl/null
                setAboutus() // nulstil/tøm evt. tidl. data
                setFejl(true)

            }

        }).finally(
            console.log("test")
            /* setLoading(false) */
        )

        hentGallery().then( data => { 

            if ( data ) {
                // Det er gået godt = data
                console.log( data )
                setGallery(data); // put data fra api'et i state
                setFejl2(false); // nulstil en evt. tidligere fejl
                console.log("test2")

            } else {
                // Det gik ikke så godt = fejl/null
                setGallery() // nulstil/tøm evt. tidl. data
                setFejl2(true)
                
            }

        }).finally(
            /* setLoading(false) */
        )

        hentReviews().then( data => { 

            if ( data ) {
                // Det er gået godt = data
                console.log( data )
                setReviews(data); // put data fra api'et i state
                setFejl(false); // nulstil en evt. tidligere fejl

            } else {
                // Det gik ikke så godt = fejl/null
                setReviews() // nulstil/tøm evt. tidl. data
                setFejl(true)

            }

        }).finally(
            setLoading(false)
        )


        
        
    }, [])



    const [button1, setButton1] = useState("active")
    const [button2, setButton2] = useState("")
    const [button3, setButton3] = useState("")

    let Knap1 = () => {
        setSlider(0)
        setButton1("active")
        setButton2()
        setButton3()
    } 

    let Knap2 = () => {
        setSlider(1)
        setButton1()
        setButton2("active")
        setButton3()
    } 

    let Knap3 = () => {
        setSlider(2)
        setButton1()
        setButton2()
        setButton3("active")
    } 

    

    return (
        <div>
            {/* Hvis der er people-data */}
            {
                aboutus && <div className="contents_2a">
                    
                    <div className="overskrift">
                        <h2>{parse(aboutus.title)}</h2>
                        <hr />
                    </div>

                    <div className="beskrivelse">
                        <p>{ parse(aboutus.content) }</p>
                    </div>

                    <span className="ydelser">SE ALLE YDELSER</span>

                    {
                    gallery && <div className="billede_container">

                        <div className="billede1">
                            
                            <img src={"http://localhost:5023/images/" + gallery[3].service.image} alt="" />
                            <h4>{gallery[3].service.title}</h4>
                            <p>{gallery[3].service.content}</p>
                           
                        </div>

                        <div className="billede2">

                            <img src={"http://localhost:5023/images/" + gallery[0].service.image} alt="" />
                            <h4>{gallery[0].service.title}</h4>
                            <p>{gallery[0].service.content}</p>

                        </div>
                        </div>}

                    </div>}



                { /* 2b start */
                reviews && <div className="contents_2b"> 

                    <div className="background_2b">

                        <div className="reviews_title">
                            <h4>Kundeudtalelser</h4>
                            <hr />
                        </div>
                        <div className="reviews_text">
                            <div className="reviews_text_content">
                                <p>"{reviews[slider].content}"</p>
                                <p className="pad">- {reviews[slider].author}</p>
                            </div>
                            <div className="reviews_text_nav">
                                <div className="reviews_button" id={button1} onClick={() => Knap1()}></div>
                                <div className="reviews_button" id={button2} onClick={() => Knap2()}></div>
                                <div className="reviews_button" id={button3} onClick={() => Knap3()}></div>
                            </div>
                        </div>

                    </div>

                </div>
                } {/* 2b end */}



            {/* Hvis vi venter på data = loading */}
            
            {
                loading && <div>
                    <h1>Der loades data fra API'et ....</h1>
                    {/* LOADER fra react-spinners */}
                    <PuffLoader color="blue" size="150" />
                </div>
            }

            {/* Opstået fejl - svar fra API'et er null */}
            {
                fejl && <h1>Der er opstået en fejl</h1>
            }

{
                fejl2 && <h1>Der er opstået en fejl2</h1>
            }

        </div>
    )
}

export default Opgave2
