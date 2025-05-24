import { Link } from "react-router-dom";
import { Instagram, MapPin, PhoneCall } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faWhatsapp,
    faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
    return (
        <footer className="flex flex-col gap-4 bg-blue-950 text-white p-8">
            <h3 className="text-3xl font-semibold my-4">Contact</h3>
            <Link className="flex items-center gap-2">
                <PhoneCall className="w-6 h-6" />
                021 7477 4154
            </Link>
            <Link className="flex items-center gap-2">
                <FontAwesomeIcon icon={faWhatsapp} size="xl" />
                +6281 1992 1084
            </Link>
            <Link className="flex items-center gap-2">
                <FontAwesomeIcon icon={faInstagram} size="xl"/> 
                @multindo.jm
            </Link>
            <Link className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Kl. Villa Pamulang Blok CF2 No.4 Pondok Benda, Pamulang,
                Tangerang Selatan
            </Link>
        </footer>
    );
};

export default Footer;
