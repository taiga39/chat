window.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('send').addEventListener('click', ()=>{
        const name=document.getElementById('name').value;
        const password=document.getElementById('password').value;

        const method='POST';
        const headers={ 'Accept': 'application/json', 'Content-Type': 'application/json' };
        const body=JSON.stringify({ 'name': name, 'password': password });
        fetch('login', { method, headers, body }).then(res=>{
            if( res.ok ){
                if( getCookie('name')==null && getCookie('password')==null &&
                    confirm('パスワードを保存しますか？\n(クッキーを使用します)') ){
                    console.log('パスワードを保存しました');
                    document.cookie=`name=${name}`
                    document.cookie=`password=${password}`;
                }
                location.reload();
            }
            else alert('ログインに失敗しました');
        });
    });
});