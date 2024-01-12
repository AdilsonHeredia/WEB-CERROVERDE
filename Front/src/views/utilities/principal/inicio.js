import React from 'react';
// VideoThumb from '@/public/images/hero-image-01.jpg';
//import ModalVideo from '@/components/modal-video';

const Hero = () => {
    return (
        <section>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">

                {/* Illustration behind hero content */}
                <div className="absolute left-0 bottom-0 -ml-20 hidden lg:block pointer-events-none" aria-hidden="true" data-aos="fade-up" data-aos-delay="400">
                    <svg className="max-w-full" width="564" height="552" viewBox="0 0 564 552" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* Define your SVG content here */}
                    </svg>
                </div>

                {/* Hero content */}
                <div className="relative pt-32 pb-10 md:pt-40 md:pb-16">

                    {/* Section header */}
                    <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
                        <h1 className="h1 mb-4" data-aos="fade-up">Centro de salud Cerro verde </h1>
                        <p className="text-xl text-gray-400 mb-8" data-aos="fade-up" data-aos-delay="200">Our landing page template works on all devices, so you only have to set it up once, and get beautiful results forever.</p>
                        <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center">
                            <div data-aos="fade-up" data-aos-delay="400">
                                <a className="btn text-white bg-purple-600 hover-bg-purple-700 w-full mb-4 sm:w-auto sm:mb-0" href="#0">Start free trial</a>
                            </div>
                            <div data-aos="fade-up" data-aos-delay="600">
                                <a className="btn text-white bg-gray-700 hover-bg-gray-800 w-full sm:w-auto sm:ml-4" href="#0">Learn more</a>
                            </div>
                        </div>
                    </div>


                </div>

            </div>
        </section>
    );
}

export default Hero;
