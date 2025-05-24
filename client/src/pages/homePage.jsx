import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useNavigate } from "react-router-dom";
import TopNav from "@/components/Layouts/TopNav,";
import Footer from "@/components/Layouts/Footer";

// Import images
import LogoMultindoJayaMandiri from "../assets/images/logo-multindo-jaya-mandiri.jpg";
import LobyHotel from "../assets/images/hotel/loby-hotel.jpg";
import ShowOnScroll from "@/components/Animation/ShowOnScroll";

// Registrasikan plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
    // const navigate = useNavigate();

    useEffect(() => {
        // Menghitung offset secara numerik:
        // Logo muncul di tengah layar, namun pada posisi final (CSS top: 24px).
        const offset = window.innerHeight / 2 - 24;

        gsap.fromTo(
            ".logo",
            {
                y: offset,
                scale: 3,
            },
            {
                color: "white",
                y: 0,
                scale: 1,
                ease: "power1.out",
                scrollTrigger: {
                    trigger: ".content",
                    // endTrigger: ".content",
                    start: "top top",
                    end: "bottom center",
                    scrub: true,
                    markers: false, // Nonaktifkan jika tidak ingin melihat marker: set ke false
                },
            }
        );

        // Refresh (opsional) jika terjadi perubahan layout
        ScrollTrigger.refresh();
    }, []);

    return (
        <div>
            <TopNav></TopNav>

            <div className="relative">
                {/* Logo yang dianimasikan */}
                <div className="logo fixed left-1/2 top-[6px] -translate-x-1/2 text-2xl font-bold text-blue-600 z-10 font-serif">
                    <img
                        src={LogoMultindoJayaMandiri}
                        alt="Logo Multindo Jaya Mandiri"
                        className="w-44"
                    />
                </div>

                {/* Section sebagai trigger animasi */}
                <section className="content mt-12 min-h-screen bg-white flex items-center justify-center"></section>

                {/* Section tambahan agar scroll terjadi */}
                <section className="relative min-h-screen bg-gray-100 flex items-center justify-around">
                    <div className="w-1/3 text-justify flex flex-col gap-6">
                        <h2 className=" text-3xl my-8 font-bold underline underline-offset-8 decoration-emerald-600">
                            <span className="text-emerald-600">Tentang</span>{" "}
                            <span>Perusahaan</span>
                        </h2>
                        <p>
                            Multindo Jaya Mandiri adalah perusaan yang bergerak
                            di bidang pengadaaan dan produksi kebutuhan hotel
                            dan resort, kami berdiri sejak tahun 2016.
                        </p>
                        <p>
                            Produk kami terbuat dari berbagai macam material
                            seperti wooden, leahter synthec, resin acrylic,
                            stainless steel, brass, creamic, glass, marble, dan
                            lainnya.
                        </p>
                        <p>
                            Kami melayani desain khusus suesuai dengan
                            permintaan dan kebutuhancustomers. Dalam hal
                            produksi, kammi memberikan layanan yang baik,
                            kualitas produk yang baik, dan dengan hara tang
                            kompetitif.
                        </p>
                        <p>
                            Kami memiliki berbagai macam produk dan pelayanan
                            yang memungkinkan untuk memnuhi permintaan atau
                            desain dari cusomer.
                        </p>
                    </div>
                    <ShowOnScroll>
                        <img
                            src={LobyHotel}
                            alt="Loby Hotel"
                            className="h-96"
                        />
                    </ShowOnScroll>
                </section>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default HomePage;
