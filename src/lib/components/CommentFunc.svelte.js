import axios from "axios";

    

        let commentText = $state([{}]);
        let CreateCommentText = $state("")
        let PostId =$state("")
        function handleComment(id){
            axios.get(`https://tarmeezacademy.com/api/v1/posts/${id}`)
            .then((res)=>commentText = res.data.data.comments)
            .then(()=> {PostId = id})
            .catch((err)=>console.log(err))
            
        }
        function getCommentText(){
            return commentText
            
        }
        function getPostId(){
            return PostId
        }
       
        
      
       
      
      

    export {handleComment,getCommentText,CreateCommentText,getPostId}



  