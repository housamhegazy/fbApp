import Clock from 'react-live-clock';
export default function MyClock(){
    return (
        <>
        <h5 className='my-3'>time now in Saudi Arabia</h5>
        <Clock format={'HH:mm:ss'} ticking={true} timezone={'Asia/Riyadh'} className="mb-4"/>
        </>
    )
}