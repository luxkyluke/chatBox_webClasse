import React from 'react';

class Formulaire extends React.Component {

   state = {
       length: this.props.length
   }

   createMessage = event => {
       event.preventDefault();

       const message = {
           pseudo: this.props.pseudo,
           message: this.message.value
       }

       this.props.addMessage(message);

       this.messageForm.reset();

       this.setState({ length: this.props.length });
   }

   compteur = event => {
       const length = this.props.length - this.message.value.length;
       this.setState({ length });
   }

   render() {
       return (
           <form
               className="form"
               onSubmit={e => this.createMessage(e)}
               /* a revoir */ ref={input => this.messageForm = input}>

               <textarea  
                   required
                   maxLength="140"
                   ref={input => this.message = input}
                   onChange={e => this.compteur(e)}>
               </textarea>

               <div className="info" >
                   {this.state.length}
               </div>

               <button type="submit" >
                       Envoyer!
               </button>

           </form>
       )
   }
}

export default Formulaire;