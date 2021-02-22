import client from './ContentfulConfig';


function getData(allData){
    // get all of the items
  let item = allData.items;
  let allItems = [];
 
  for(let i=0; i<item.length; i++){

    let imgArr =[];
    
    for(let j =0; j< item[i].fields.images.length; j++){
        imgArr.push(item[i].fields.images[j].fields.file.url);
    }
   
    allItems.push({
      images: imgArr,
      company: item[i].fields.company,
      testimony: item[i].fields.testimony,
      person: item[i].fields.person,
      scope: item[i].fields.scope,
      bottomLine: item[i].fields.bottomLine,
      logo: item[i].fields.logo.fields.file.url,
      link: item[i].fields.bottomLine,
    });
  }
  
  return allItems;
}

function sortHighlight(data){
    let imgArr = [];
   
    for(let i =0; i<data.images.length; i++){
       
      imgArr.push(data.images[i].fields.file.url);
    }
    return {
      images: imgArr,
      company: data.company,
      testimony: data.testimony,
      person: data.person,
      scope: data.scope,
      bottomLine: data.bottomLine,
      logo: data.logo.fields.file.url,
      link: data.bottomLine,
      highlight: data.highlight,
    };
}

// get all projects
export async function getProjects(projectType){
  
    let projects = await client.getEntries({
      content_type: projectType,
      resolveLinks: true,
    });
    
    
    
    
    if (projectType === "project") {
        const filter = await getData(projects);
        return filter;
    }
    else{
        const highlight = await sortHighlight(projects.items[0].fields.project.fields);
        return highlight;
    }
}