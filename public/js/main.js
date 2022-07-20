function user_details(){
    document.getElementById('user-details').style.display = 'block';
    document.getElementById('user-orders').style.display = 'none';
    document.getElementById('user-history').style.display = 'none';
}
function user_orders(){
    document.getElementById('user-orders').style.display = 'block';
    document.getElementById('user-details').style.display = 'none';
    document.getElementById('user-history').style.display = 'none';
}
function user_history(){
    document.getElementById('user-history').style.display = 'block';
    document.getElementById('user-details').style.display = 'none';
    document.getElementById('user-orders').style.display = 'none';
}

function get_collection(){
    document.getElementById('collection-section').style.display = 'block';
    document.getElementById('market-section').style.display = 'none';
}
function get_marketplace(){
    document.getElementById('market-section').style.display = 'block';
    document.getElementById('collection-section').style.display = 'none';
}