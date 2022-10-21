const { useState } = React;
const root = ReactDOM.createRoot(document.getElementById('root'));


// -------------------------------------------------------
function Header() {
  return (
    <>
      <header className="header">
        <div className="container">
          <img src="images/index/logo.svg" alt="" />
          <nav className="navbar">
            <a href="">Kaya的待辦</a>
            <a href="">登出</a>
          </nav>
        </div>
      </header>
    </>
  )
}
// -------------------------------------------------------






// -------------------------------------------------------
// 拆出來的新增 元件
const AddMenuInput = function ({ todoStatus, setTodoFunc }) {

  // const AddMenuInput = function (props)
  // const { todoStatus, setTodoFunc } = props;
  // 這邊改寫成這樣也可以  現在是直接當參數傳
  // -----------------------------------------------------

  // 新增輸入的待辦 (讓待辦框即時更新 以及 組 點擊+ 能夠提取出來的 input欄位)
  const [inputContent, setInputContent] = useState("");

  // 組出  能放進陣列內的 物件才能跑 map 出 li
  let inputItem = {
    txt: inputContent, // 輸入事項
    id: new Date().getTime(), // 抓獨特項目 刪除或切換狀態用的
    checked: false // 判別已完成 待完成項目的 false 為未完成
  }

  // console.log(todoStatus)

  return (
    <>
      <div className="card input">

        <input type="text" value={inputContent} onChange={(e) => { setInputContent(e.target.value) }} className="inputText" placeholder="請輸入待辦事項" />

        {/* 點擊後執行寫入 瞬間把input值 組成物件寫到 todo陣列內 並清空input等待輸入下筆 */}
        <input type="button" className="addClick" onClick={() => {
          setTodoFunc([...todoStatus, inputItem])
          setInputContent('')
        }} value='+' disabled={inputContent == ''} />

      </div>
    </>
  )
}
// -------------------------------------------------------







// -------------------------------------------------------
// 拆出來的切換 元件
const TabMenu = function (props) {

  const { tabStatus, setTabFunc } = props;

  const handleChangeTab = (e) => {    // 個別綁每個 li onclick 也能做一樣的事情
    setTabFunc(e.target.dataset.tab)   // 把狀態寫給資料狀態
  }

  // 三元判斷 點擊到的目前狀態 寫上active 不是的那個寫空''
  return (
    <>
      <ul className="tab" onClick={handleChangeTab}>
        <li className={tabStatus == 'all' ? 'active' : ''} data-tab="all" >全部</li>
        <li className={tabStatus == 'ing' ? 'active' : ''} data-tab="ing">待完成</li>
        <li className={tabStatus == 'fin' ? 'active' : ''} data-tab="fin">已完成</li>
      </ul>
    </>
  )
}
// -------------------------------------------------------






// -------------------------------------------------------
// 拆出來 做切換 底下任務狀態變動
const RenderTodo = function (props) {

  const { tabStatus, setTabFunc, todoStatus, setTodoFunc } = props;

  // ------------------------------------------------------
  // 刪除功能 陣列抓出來 重新改資料狀態 就等同刪除功能 (React就是不斷改資料狀態)
  const handleDelete = (e) => {
    const id = e.target.dataset.num;
    console.log(id)
    console.log(todoStatus) // 幾筆

    let todoDelUpdate = todoStatus.filter(function (item, index) {
      return item.id != id;  // 將會回傳 不等同點選的項目 => 留下來的意思  而留下的項目 會set塞回去資料狀態內
    })

    console.log(todoDelUpdate)
    setTodoFunc(todoDelUpdate)
    // ----------------------------------------------------
    // 如果是直接click 還需要判斷 監聽範圍(JS的Li) 嗎？
    // if (e.target.classList.value == "delete") {
    //   setTodoData((prev) => {
    //     return {
    //       ...prev, todoUpdate
    //     };
    //   });
    // }
    // ---------------------------------------------------
    // 刪除兩種方法 一個是需要有編號index直接刪掉splice刪1筆  一個是回傳剩下的再塞入更新資料狀態 filter
    // todoUpdate = todoData.filter(function (item, index) {
    //   return item.id != id;
    // })

    // let todoUpdate = todoData.filter(function (item, index) {
    //   return item.id != id;
    // })
  };
  // -----------------------------------------------------




  // ----------------------------------------------------------
  // 變更 點到的 狀態
  // 點擊到input 要怎麼知道我點到哪筆呢 進行抓取我點的哪筆 會寫上checked 
  // 寫上反轉布林 並且要回傳

  const handleDone = (e) => {
    const id = e.target.dataset.num;
    console.log(id)


    setTodoFunc((prev) => {
      return prev.map(function (item) {
        if (item.id == id) {
          return { ...item, checked: !item.checked }
        }
        return item
      })
    })

  };
  console.log(todoStatus)





  // ------------------------------------------------------
  // 依據點擊到的上欄 去filter 篩選出 我要的待辦事務
  let todoContent = []

  if (tabStatus == 'all') {
    todoContent = todoStatus.slice()
  }
  else if (tabStatus == 'ing') {
    todoContent = todoStatus.filter(item => item.checked == false)
  }
  else if (tabStatus == 'fin') {
    todoContent = todoStatus.filter(item => item.checked == true)
  }




  // 解決 checked={item.checked} 這個靜態輸入 會造成的紅字報錯
  // 使用 defaultChecked 則會造成 check狀態奇怪
  // 解決方法是 在checked 那串程式碼加上  onChange={e => {}} 

  // https://www.appsloveworld.com/reactjs/100/26/failed-prop-type-you-provided-a-checked-prop-to-a-form-field-without-an-oncha

  return (
    <>
      {
        todoContent.map((item, index) => {

          return (

            <li key={index} id={item.id} >

              <label htmlFor="" className="checkbox">

                <input type="checkbox" key={item.checked} onChange={e => { }} checked={item.checked} data-num={item.id} onClick={handleDone} />

                {/* <span data-num={item.id} onClick={handleDone}>{item.txt}</span> */}
                <span>{item.txt}</span>

              </label>

              <button className="delete" data-num={item.id} onClick={handleDelete}></button>

            </li>
          )
        })
      }
    </>
  )
}
// -------------------------------------------------------











// -------------------------------------------------------
function Main() {

  // 待辦資料狀態
  const [todoData, setTodoData] = useState([
    // { txt: '預設待辦事項一條', id: new Date().getTime(), checked: "" },
  ])
  // ------------------------------------------------------



  // 切換的資料狀態 (引入 上方的點擊切換 及 下方任務變動)
  const [tab, setTab] = useState('all')


  // 待完成項目幾個 算長度
  let notDone = todoData.filter((notItem) => notItem.checked == false);


  // 清除已完成的項目
  const handleFinDelete = (e) => {
    e.preventDefault();
    const done = todoData.filter(item => { return item.checked == false })
    setTodoData(done)
  }




  return (
    <>
      <main className="web_detail">
        <div className="todo_content">

          <AddMenuInput todoStatus={todoData} setTodoFunc={setTodoData} />

          <div className="card card_list">

            <TabMenu tabStatus={tab} setTabFunc={setTab} />

            <div className="cart_content">

              <ul className="list">

                <RenderTodo tabStatus={tab} setTabFunc={setTab} todoStatus={todoData} setTodoFunc={setTodoData} />

              </ul>

              <div className="list_footer">
                <p>
                  <span className="ingNum">{notDone.length}</span>
                  &nbsp; 個待完成項目
                </p>
                <a href="" className="clearFin" onClick={handleFinDelete}>清除已完成項目</a>
              </div>

            </div>
          </div>
        </div>
      </main>
    </>
  )
}







// ------------------------------------------------------------
function App() {
  return (
    <>
      <div className="basic_wrap index_wrap">
        <Header />
        <Main />
      </div>
    </>
  )
}
root.render(<App />);