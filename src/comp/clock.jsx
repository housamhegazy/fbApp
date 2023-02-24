import Clock from 'react-live-clock';
export default function MyClock(){
    return (
        <>
        <h5>time now</h5>
        <Clock format={'HH:mm:ss'} ticking={true} timezone={'US/Pacific'} className="mb-4"/>
        </>
    )
}