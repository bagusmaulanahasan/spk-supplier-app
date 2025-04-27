import useSidebarStore from '../../store/sideBarStore';
import SideNav from '../Fragments/SideNav';

const ContainerPage = (props) => {
    const {children} = props;
    const { isOpen, toggleSidebar } = useSidebarStore();
    return (
        <div className="flex">
            <SideNav></SideNav>
            <div
                className={`p-5 transition-all duration-300 ease-in-out w-screen ${
                    isOpen ? "ml-64" : "ml-20"
                }`}
            >
                <div className="px-6 mt-4.5">{children}</div>
            </div>
        </div>
    );
};

export default ContainerPage;
