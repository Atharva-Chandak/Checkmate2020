
let row=6,col=11,total_players=2,count_moves=0,hidden_move=0,orb_no=0,player,bg_color;
let bool,existing_div,matches,prev_parent_id,living_players=[0],current_status=[];
let grid=[];
for(let r=0; r<row; r++)
    grid[r]=[];
////////////////////////////////////////////////////////////////////////////////

function cssMulti(element,css){
    let ele=document.getElementById(element);
    for(i in css){
        ele.style[i]=css[i];
    }                
}
////////////////////////////////////////////////////////////////////////////////
window.onload= function () {
	}

	function openFullscreen(elem) {
		if (elem.requestFullscreen) {
		  elem.requestFullscreen();
		} else if (elem.mozRequestFullScreen) { /* Firefox */
		  elem.mozRequestFullScreen();
		} else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
		  elem.webkitRequestFullscreen();
		} else if (elem.msRequestFullscreen) { /* IE/Edge */
		  elem.msRequestFullscreen();
		}
	  }
////////////////////////////////////////////////////////////////////////////////

function start(){
	document.getElementsByClassName('container')[0].style.visibility="visible" ;
    for(let row_entry=0; row_entry<row; row_entry++)
        {
            for(let col_entry=0; col_entry<col; col_entry++)
            {
                grid[row_entry][col_entry]=null;
                let div=document.createElement('div');
                div.setAttribute('id','r' + row_entry +'c' + col_entry);
                div.addEventListener("click",() =>move(div.id,'player'+count_moves%total_players,false))
                document.getElementsByClassName('container')[0].appendChild(div);
				cssMulti('r' + row_entry +'c' + col_entry,{'grid-column': col_entry+1 , 'grid-row': row_entry+1}) 
				              
            }
		}
    	setTimeout(()=>{document.getElementsByClassName('container')[0].style.zIndex="1";} ,2000) 
		document.getElementById('modal').style.transform="translateY(-100vh)" ;
		let elem = document.documentElement;
		openFullscreen(elem);
		
}

////////////////////////////////////////////////////////////////////////////////

function move(id,player,bool){
    
    player_num = player.match(/\d+/g);
    let c=document.getElementById(id).className;
    if(c==null || c==0 || c=='player'+player_num || bool){
		if(!(bool))
			count_moves++;
		orb_no++;
		color=get_color(id,player,bool,+player_num[0]);
		orb_color=color.orb_color;
		bg_color=color.bg_color;
        capture(id,orb_color);
        let new_div=document.createElement('div');
		new_div.setAttribute('id',orb_no);
		document.getElementById(id).setAttribute('class',player);
		document.getElementById(id).appendChild(new_div);
		check_split(id,player,false);
		if(document.getElementById(orb_no))
        cssMulti(orb_no,{'background':orb_color});
		bool=false;

		let container=document.getElementsByClassName('container')[0];
		container.style.background=bg_color;
		container.style.border="0.2em solid "+bg_color;
		// for(childNode of container.childNodes)
		// childNode.style.backgroundColor=bg_color;   


		//store();
	}
	//check();
}

////////////////////////////////////////////////////////////////////////////////
function add_orb(id,player){
	player_num = player.match(/\d+/g);
	matches = id.match(/\d+/g);
	for(let i=-1; i<2;i++)
		for(let j=-1; j<2;j++)
			{
				if(i!=j && (i-j == 1 || i-j ==0 || i-j==-1))
					{
						if(document.getElementById('r'+(+matches[0]+i) +'c'+ (+matches[1]+j) ))
						{div=document.createElement('div');
						div.setAttribute('id',++orb_no);
						color=get_color(id,player,bool,+player_num[0]);
						orb_color=color.orb_color;
						capture('r'+(+matches[0]+i) +'c'+(+matches[1]+j),orb_color,player);
						document.getElementById('r'+(+matches[0]+i) +'c'+ (+matches[1]+j) ).appendChild(div);
						cssMulti(orb_no,{'background':orb_color});
					}
				}
		}
			
bool=false;

    //check();
}
////////////////////////////////////////////////////////////////////////////////

function get_color(id,player,bool,player_num){
        let orb_color;
        switch(player_num){
			case 0: color={orb_color:'radial-gradient(circle at 50% 50%, rgb(255,0,0) 1%, rgb(190,0,0) 60%)'	,bg_color:'rgba(0,0,255)'};break;
            case 1: color={orb_color:'radial-gradient(circle at 50% 50%, blue 1%, darkblue 60%)',bg_color:'rgb(255,0,0)'};break;
            // case 2: color={orb_color:'radial-gradient(circle at 50% 50%, blue 1%, darkblue 60%)',bg_color:'rgb(255,0,0)'};break;
			// case 3: color={orb_color:'radial-gradient(circle at 50% 50%, rgb(255, 0, 125) 1%, rgb(197, 0, 97) 60%)',bg_color:''};break;
			// // case 4: color={orb_color:'radial-gradient(circle at 50% 50%, rgb(0,255,0) 1%, rgb(0,190,0) 60%)',bg_color:'black'};break;
            // case 5: color={orb_color:'radial-gradient(circle at 50% 50%, rgb(0,255,0) 1%, rgb(0,190,0) 60%)',bg_color:'black'};break;
            // case 6: color={orb_color:'radial-gradient(circle at 50% 50%, rgb(0,255,0) 1%, rgb(0,190,0) 60%)',bg_color:'black'};break;
            // case 7: color={orb_color:'radial-gradient(circle at 50% 50%, rgb(0,255,0) 1%, rgb(0,190,0) 60%)',bg_color:'black'};break;
            // case 8: color={orb_color:'radial-gradient(circle at 50% 50%, rgb(0,255,0) 1%, rgb(0,190,0) 60%)',bg_color:'black'};break;
            // case 9: color={orb_color:'radial-gradient(circle at 50% 50%, rgb(0,255,0) 1%, rgb(0,190,0) 60%)',bg_color:'black'};break;
            // case 10: color={orb_color:'radial-gradient(circle at 50% 50%, rgb(0,255,0) 1%, rgb(0,190,0) 60%)',bg_color:'black'};break;

        }
        return color;
}

////////////////////////////////////////////////////////////////////////////////

function capture(id,orb_color,capturer){
    for(existing_div of document.getElementById(id).childNodes)   //while capturing this will turn all into conquerer's color
		{existing_div.style.background=orb_color;}
	document.getElementById(id).className=capturer;
	
}
////////////////////////////////////////////////////////////////////////////////

function check_split(id,player,bool){
	if(document.getElementById(id)!=null )
		{
			if(id=='r0c0'||id=='r0c'+(col-1)||id=='r'+(row-1)+'c0'||id=='r'+(row-1)+'c'+(col-1)){
				if(document.getElementById(id).childElementCount>=2)
					{split_two(id,player);  }
				}
			else if(id.substring(0,2)=='r0'|| id.substring(2,4)=='c0'|| id.substring(0,2)=='r'+(row-1)|| id.substring(2,4)=='c'+(col-1)){
					if( document.getElementById(id).childElementCount>=3)
					{ split_three(id,player);}
				}
			else{	
				if(document.getElementById(id).childElementCount>=4 )
				{split_four(id,player); }    
				}
		}
	}
////////////////////////////////////////////////////////////////////////////////
function split_four(id,player){
	let parentDiv=document.getElementById(id);
    // for(div of parentDiv.childNodes)             
	// {div.parentNode.removeChild(div) } 
	// const myNode = document.getElementById("foo");
	parentDiv.childNodes[0].style.animation="split_right 1s linear 0s";
	parentDiv.childNodes[1].style.animation="split_top 1s linear 0s";
	parentDiv.childNodes[2].style.animation="split_left 1s linear 0s";
	parentDiv.childNodes[3].style.animation="split_down 1s linear 0s";
	
	setTimeout(delete_orbs,500,id,parentDiv,player);
}

function delete_orbs(id,parentDiv,player){
	while (parentDiv.firstChild) {
		parentDiv.removeChild(parentDiv.firstChild);
	}
	parentDiv.removeAttribute('class'); 
	add_orb(id,player)
	for(let i=0; i<row;i++)
		for(let j=0; j<col;j++)
		{
				check_split('r'+i +'c'+ j,player,true);
		}
}
////////////////////////////////////////////////////////////////////////////////

function split_two(id,player){
    let parentDiv=document.getElementById(id);
	while (parentDiv.firstChild) {
		parentDiv.removeChild(parentDiv.firstChild);
	}
	parentDiv.removeAttribute('class') 
	add_orb(id,player)

	for(let i=0; i<row;i++)
		for(let j=0; j<col;j++)
		{
				check_split('r'+i +'c'+ j,player,true);
		}
}
////////////////////////////////////////////////////////////////////////////////

function split_three(id,player){
    let parentDiv=document.getElementById(id);
	while (parentDiv.firstChild) {
		parentDiv.removeChild(parentDiv.firstChild);
	}
	parentDiv.removeAttribute('class');
	add_orb(id,player)


	for(let i=0; i<row;i++)
			for(let j=0; j<col;j++)
			{
					check_split('r'+i +'c'+ j,player,true);
			}
	}
////////////////////////////////////////////////////////////////////////////////