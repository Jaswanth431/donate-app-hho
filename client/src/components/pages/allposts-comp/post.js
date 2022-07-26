import React, {Fragment} from "react";
import MAIN from "../../utilities/main";

import './allposts-main.css';
import calendersvg from '../../../resources/calender.svg';
import {ReactComponent as LOADINGRING } from '../../../resources/loadingring1.svg'
import {useParams } from 'react-router-dom';
import { getPostByTitle } from "../../../api/index";
import {useState, useEffect} from 'react';
import timeSince from '../../utilities/generalFunction';



const POST = ()=>{
    const {postid} = useParams();
    const [postData, setData] = useState(null);

    const getData = async ()=>{
         let data = await getPostByTitle(postid);
         setData(data);
    }
     
    useEffect(()=>{
          getData();
    }, []);


    return (
        <MAIN>
             <section className="row">
                <div className="post-box single-post">

                    {!postData && <LOADINGRING/>}
                    {!!postData && postData.size == 0 && <h1 className="post-not-found">The post you are looking for does not exist !!</h1>}
                    {!!postData &&  postData.size !=0 &&
                    <Fragment>
                        <div className="post-header-box">
                            <h1>{postData.docs[0].heading}</h1>
                            <p className="posted-date"><span><img src={calendersvg}/></span>Posted {timeSince(postData.docs[0].date)} ago   </p>
                        </div> 
                        <p className="post-body" dangerouslySetInnerHTML={{ __html: postData.docs[0].body}}>
                        
                        </p>
                    </Fragment>
                    }
                    
                    
                    
                   
                </div>
             </section>
        </MAIN>
    );
}

export default POST ; 