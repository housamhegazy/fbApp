import { Helmet } from "react-helmet-async";
function Modal({ closeModel, children,backgroundColor="whitesmoke"}) {
  return (
    <div className="parent-of-modal">
      <Helmet>
        <style type="text/css">
          {`
          .parent-of-modal{
            position: fixed;
            top:0;
            left:0;
            width:100%;
            height: 100%;
            background-color: #33333388;
            
          }
          .modal{
            width: 400px;
            height: 333px;
            border-radius: 12px;
            top:50%;
            left:50%;
            transform: translate(-50%,-50%);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction:column;
            animation:mymove .8s ;
            overflow-y: auto;
          } 
          
          @keyframes mymove{
            0% {scale:0;  transform: translate(-100vh,-100vh);}
            100% {scale:1;  transform: translate(-50%,-50%);}
          }
          @media(max-width:767px){
            .modal{
              width:90%
            }
          }
          
          .close{
            position:absolute;
            top:10px;
            right:10px;
            cursor: pointer;
            font-size: 20px;
            color: red;
          }
          .modal::-webkit-scrollbar {
            width: .5em;
          }
          .modal::-webkit-scrollbar-track {
          -webkit-box-shadow:inset 0 0 16px 2px rgb(44 8 78);
          }
          .modal::-webkit-scrollbar-thumb {
          background-color: rgb(53 27 78);
          -webkit-box-shadow:inset 0 0 6px 4px rgb(99 45 151);
          border-radius:5px;
          }
          .dark .modal{
            background-color: #000000d1!important;
          }
      
           `}
        </style>
      </Helmet>
      <form style={{backgroundColor: `${backgroundColor}`}} className="modal">
        <div
          onClick={() => {
            closeModel();
          }}
          className="close"
        >
          <i className="bi bi-x-circle"></i>
        </div>
        {children}
      </form>
    </div>
  );
}
export default Modal;