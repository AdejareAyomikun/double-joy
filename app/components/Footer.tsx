export default function Footer() {
    return(
        <footer className="bg-gray-800 text-white py-6 mt-10">
            <div className="grid grid-cols-5 p-5">
                <a href="/">Double-Joy</a>
                <div className="block">
                    <ul>
                        <li><a href="">Help</a></li>
                        <li><a href="">Help</a></li>
                        <li><a href="">Help</a></li>
                        <li><a href="">Help</a></li>
                    </ul>
                </div>
                <div className="block">
                    <ul>
                        <li><a href="">Help</a></li>
                        <li><a href="">Help</a></li>
                        <li><a href="">Help</a></li>
                        <li><a href="">Help</a></li>
                    </ul>
                </div>
                <div className="block">
                    <ul>
                        <li><a href="">Help</a></li>
                        <li><a href="">Help</a></li>
                        <li><a href="">Help</a></li>
                        <li><a href="">Help</a></li>
                    </ul>
                </div>
                <div className="block">
                    <ul>
                        <li><a href="">Help</a></li>
                        <li><a href="">Help</a></li>
                        <li><a href="">Help</a></li>
                        <li><a href="">Help</a></li>
                    </ul>
                </div>
                
            </div>
            <hr />
            <div className="container pt-5 mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} Double-Joy. All rights reserved.</p>
            </div>
        </footer>
    )
}