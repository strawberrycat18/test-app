// import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginPage from "./views/LoginPage"
import PostPageAdd from './views/PostPageAdd';
import PostPageDetails from './views/PostPageDetails';
import PostPageHome from './views/PostPageHome';
import PostPageUpdate from './views/PostPageUpdate';
import SignUpPage from './views/SignUpPage';
import PageNotFound from './views/PageNotFound';
import PostNotFound from './views/PostNotFound';

function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<PostPageHome/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/signup" element={<SignUpPage/>}/>
          <Route path="/add" element={<PostPageAdd/>}/>
          <Route path="*" element={<PageNotFound/>}/>
          <Route path="/postnotfound" element={<PostNotFound/>}/>
          <Route path="/post/:id" element={<PostPageDetails/>}/>
          <Route path="/update/:id" element={<PostPageUpdate/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
