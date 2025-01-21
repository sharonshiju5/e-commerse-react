import cart from "../assets/cart.webm"
function Animation(){
    const ani ={
        height:'80px',
    borderRadius: '5px',
    }
return(
    <>
    <video style={ani} autoPlay muted loop src={cart}></video>
    </>
)
}
export default Animation