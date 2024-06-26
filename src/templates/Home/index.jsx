import { Component } from "react";

import "./styles.css";

import { loadPosts } from "../../utils/load-posts";
import { Posts } from "../../components/Posts";
import { Button } from "../../components/Button";
import { TextSearch } from "../../components/TextSearch";

class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 10,
    searchQuery: "",
  };

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;

    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    });
  };

  loadMorePosts = () => {
    const { page, postsPerPage, allPosts, posts } = this.state;

    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);

    posts.push(...nextPosts);

    this.setState({ posts, page: nextPage });
  };

  handleChange = (e) => {
    const { value } = e.target;

    this.setState({ searchQuery: value });
  };

  render() {
    const { posts, page, postsPerPage, allPosts, searchQuery } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;
    const filteredPosts = searchQuery
      ? allPosts.filter((post) => {
          return post.title.toLowerCase().includes(searchQuery.toLowerCase());
        })
      : posts;

    return (
      <section className="container">
        <div className="search-container">
          {searchQuery && (
            <h1>
              Search value: <span>{searchQuery}</span>
            </h1>
          )}

          <TextSearch
            handleChange={this.handleChange}
            searchQuery={this.searchQuery}
          />
        </div>

        {filteredPosts.length > 0 && <Posts posts={filteredPosts} />}

        {filteredPosts.length === 0 && <p>Não existem posts ://///</p>}

        <div className="button-container">
          {!searchQuery && (
            <Button
              text="load more posts"
              onClick={this.loadMorePosts}
              disabled={noMorePosts}
            />
          )}
        </div>
      </section>
    );
  }
}

export default Home;
