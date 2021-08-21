import logo from './logo.svg';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faUsers } from '@fortawesome/free-solid-svg-icons';
import RepoComponent from './Repo';
import { Component } from 'react';
import AwesomeDebouncePromise from 'awesome-debounce-promise';

class App extends Component {
  state = {
    user: "",
    repos: [],
    loading: true,
    value: "fewz"
  }

  componentDidMount() {
    this.setState({ loading: true });
    fetch('https://api.github.com/users/fewz')
      .then(res => res.json())
      .then((data) => {
        this.setState({ user: data })
      })
      .catch(console.log)
    fetch('https://api.github.com/users/fewz/repos')
      .then(res => res.json())
      .then((data) => {
        this.setState({ repos: data });
        this.setState({ loading: false });
      })
      .catch(console.log)
  }
  render() {

    let val = "";
    let timer;

    const HandlerOnChange = (e) => {
      val = e.target.value;
      this.setState({ value: e.target.value });
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (val == e.target.value && val != "") {
          console.log(val);
          doSearch(val);
        }
      }, 1000);
    }

    const doSearch = (val) => {
      this.setState({ loading: true });
      fetch('https://api.github.com/users/' + val)
        .then(res => res.json())
        .then((data) => {
          this.setState({ user: data })
        })
        .catch(this.setState({ user: null }))
      fetch('https://api.github.com/users/' + val + '/repos')
        .then(res => res.json())
        .then((data) => {
          this.setState({ repos: data });
          this.setState({ loading: false });
        })
        .catch(this.setState({ repos: [] }))
    }


    if (this.state.user) {
      return (
        <div className="App">
          <div className="Search">
            <h5>Search username</h5>
            <input type="text" placeholder="Search Username..." value={this.state.value} onChange={(e) => HandlerOnChange(e)}></input>
          </div>
          <div className="Profile">
            <h1>Detail Profile</h1>
            <img src={this.state.user.avatar_url} />
            <h3>{this.state.user.name}</h3>
            <h5>{this.state.user.login}</h5>
            <div>
              <FontAwesomeIcon icon={faMapMarkerAlt} /> {this.state.user.location}
            </div>
            <div style={{ marginTop: 5 }}>
              <FontAwesomeIcon icon={faUsers} /> {this.state.user.followers} followers - {this.state.user.following} following
            </div>
            <p>Joined at {this.state.user.created_at} and have {this.state.user.public_repos} repositories</p>
          </div>
          <div className="RepoList">
            {this.state.repos.map((repos) => (
              <RepoComponent title={repos.name} description={repos.description} language={repos.language} star={repos.watchers} download={repos.forks}></RepoComponent>
            ))}
          </div>
        </div>
      );
    }
    else {
      if (this.state.loading) {
        return (
          <div className="App">
            <div className="Search">
              <h5>Search username</h5>
              <input type="text" placeholder="Search Username..." value={this.state.value} onChange={(e) => HandlerOnChange(e)}></input>
            </div>
            <h1>Loading</h1>
          </div>
        );
      }
      else {
        return (
          <div className="App">
            <div className="Search">
              <h5>Search username</h5>
              <input type="text" placeholder="Search Username..." onChange={(e) => HandlerOnChange(e)}></input>
            </div>
            <h1>User not exists</h1>
          </div>
        );
      }
    }
  }
}

export default App;
