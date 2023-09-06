import '../assets/styles/components/Carousel.css'

export default function Carousel() {
    return (
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel"  data-bs-interval="3000">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
            </div>
            <div className="carousel-inner carousel">
                <div className="carousel-item active fluid-container h-100">
                    <div className="row carousel-1 ps-lg-5 ps-3 h-100">
                        <div className="col-lg-10 col-md-8 col-sm-8 col-7 text-light pt-lg-5 pt-md-3 pt-sm-3 pt-2">
                            <div className='fs-3'>Find your food recipe easily</div>
                            <div>Effortlessly discover a wide range of recipes with our user-friendly search and navigation tools</div>
                        </div>
                        <div className="col-lg-2 col-md-4 col-sm-4 col-5 img-1"></div>
                    </div>
                </div>
                <div className="carousel-item fluid-container h-100">
                    <div className="row carousel-1 ps-lg-5 ps-3 h-100">
                        <div className="col-lg-10 col-md-8 col-sm-8 col-7 text-light pt-lg-5 pt-md-3 pt-2">
                            <div className='fs-3'>Add your own recipe</div>
                            <div>Upload your own home made recipe, and share it with other members of our community</div>
                        </div>
                        <div className="col-lg-2 col-md-4 col-sm-4 col-5 img-2"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}