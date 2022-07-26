import React from "react";
import MAIN from "../../utilities/main";
import './allposts-main.css';
import calendersvg from '../../../resources/calender.svg';
import timeSince from '../../utilities/generalFunction';
import { getAllPosts } from "../../../api/index";
import {useState, useEffect} from 'react';
import {ReactComponent as LOADINGRING } from '../../../resources/loadingring1.svg';
import {Link } from 'react-router-dom';

const ALLPOSTS = ()=>{
    const [postData, setData] = useState(null);

    const getData = async ()=>{
         let data = await getAllPosts();
         setData(data);
    }
     
    useEffect(()=>{
          getData();
    }, []);


    let allPosts = [];
    if(!!postData && postData.size != 0 ) {
        allPosts = postData.docs.map((item)=> <div  key={item._id}className="post-box">
                    
                        <div className="post-header-box">
                            <h1>{item.heading}</h1>
                            <p className="posted-date"><span><img src={calendersvg}/></span>Posted {timeSince(item.date)} ago</p>
                        </div>
         
                            <p className="post-body"  dangerouslySetInnerHTML={{ __html: `${item.body.slice(0, 550)} `}}>
                            {/* {item.body} */}
                            </p>
        <Link to={item.url} className="btn btn-special">Read more</Link>
    </div> );
    }
 
    return ( 
        <MAIN>
             <section className="row">
             {!postData && <div className="post-box"><LOADINGRING/> </div>}
             {!!postData && postData.size == 0 && <div className="post-box"><h1 className="post-not-found">No posts found</h1></div>}
             {!!postData && postData.size>0 && allPosts};
               
             </section>
        </MAIN>
    );
}
    
export default ALLPOSTS ; 