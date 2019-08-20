import React, { Fragment } from "react";
import PropTypes from "prop-types";

const Profile = props => {
  return (
    <Fragment>
      <a href="profiles.html" class="btn btn-light">
        Back to Profiles
      </a>

      <div class="profile-grid my-1">
        <div class="profile-top bg-primary p-2">
          <img
            class="round-img"
            src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?size=200"
          />
          <h1 class="large">John Doe</h1>
          <p class="lead">Developer at Microsoft</p>
          <p>Seattle,WA</p>
          <div class="icons my-1">
            <a href="#">
              <i class="fa fa-globe fa-2x" aria-hidden="true" />
            </a>
            <a href="#">
              <i class="fa fa-twitter fa-2x" aria-hidden="true" />
            </a>
            <a href="#">
              <i class="fa fa-facebook fa-2x" aria-hidden="true" />
            </a>
            <a href="#">
              <i class="fa fa-linkedin fa-2x" aria-hidden="true" />
            </a>
            <a href="#">
              <i class="fa fa-instagram fa-2x" aria-hidden="true" />
            </a>
          </div>
        </div>
        <div class="profile-about bg-light p-2">
          <h2 class="text-primary">John's Bio</h2>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit .
            Necessitatibus atque incidunt veritatis in laborum r epudiandae
            ducimus odit accusamus, iure molestiae vit ae ratione cumque maxime
            harum. Quia asperiores exceptur i facilis odit.
          </p>
          <div class="line" />
          <h2 class="text-primary">Skill Set</h2>
          <div class="skills">
            <div class="p-1">
              <i class="fa fa-check" aria-hidden="true" />
              HTML
            </div>
            <div class="p-1">
              <i class="fa fa-check" aria-hidden="true" />
              CSS
            </div>
            <div class="p-1">
              <i class="fa fa-check" aria-hidden="true" />
              Javascript
            </div>
            <div class="p-1">
              <i class="fa fa-check" aria-hidden="true" />
              Python
            </div>
          </div>
        </div>
        <div class="profile-exp bg-white p-2">
          <h2 class="text-primary">Experience</h2>
          <div>
            <h3>Microsoft</h3>
            <p>Oct 2011 - Current</p>
            <p>
              <strong>Position:</strong> Senior Developer
            </p>
            <p>
              <strong>Description:</strong> Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Ab quisquam ut exercitationem est,
              cumque veniam omnis quo error nesciunt molestias veritatis.
              Delectus, totam omnis! Esse id aut veniam doloremque quam?
            </p>
          </div>
          <div>
            <h3>Facebook</h3>
            <p>Oct 2014 - Current</p>
            <p>
              <strong>Position:</strong> Senior Developer
            </p>
            <p>
              <strong>Description:</strong> Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Ab quisquam ut exercitationem est,
              cumque veniam omnis quo error nesciunt molestias veritatis.
              Delectus, totam omnis! Esse id aut veniam doloremque quam?
            </p>
          </div>
        </div>
        <div class="profile-edu bg-white p-2">
          <h2 class="text-primary">Education</h2>
          <div>
            <h3>University Of Washington</h3>
            <p>Sep 1993-June 1999</p>
            <p>
              <strong>Degree:</strong> Master
            </p>
            <p>
              <strong>Field Of Study:</strong> Computer Science
            </p>
            <p>
              <strong>Description:</strong> Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Ab quisquam ut exercitationem est,
              cumque veniam omnis quo error nesciunt molestias veritatis.
              Delectus, totam omnis! Esse id aut veniam doloremque quam?
            </p>
          </div>
        </div>
        <div class="profile-github">
          <h2 class="text-primary my-2">
            <i class="fa fa-github" aria-hidden="true" /> Github Repos
          </h2>
          <div class="repo bg-white my-1">
            <div>
              <h4>
                <a href="#">Repo One</a>
              </h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Facilis, consequatur sunt tempora blanditiis ullam voluptatem
                ipsam. Accusantium nobis atque quaerat distinctio, sapiente,
                reiciendis natus perspiciatis maiores delen iti explicabo illum
                mollitia.
              </p>
            </div>
            <div>
              <ul>
                <li class="badge badge-primary">Stars: 44</li>
                <li class="badge badge-primary">Watchers: 20</li>
                <li class="badge badge-primary">Forks: 25</li>
              </ul>
            </div>
          </div>
          <div class="repo bg-white my-1">
            <div>
              <h4>
                <a href="#">Repo Two</a>
              </h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Facilis, consequatur sunt tempora blanditiis ullam voluptatem
                ipsam. Accusantium nobis atque quaerat distinctio, sapiente,
                reiciendis natus perspiciatis maiores delen iti explicabo illum
                mollitia.
              </p>
            </div>
            <div>
              <ul>
                <li class="badge badge-primary">Stars: 44</li>
                <li class="badge badge-primary">Watchers: 20</li>
                <li class="badge badge-primary">Forks: 25</li>
              </ul>
            </div>
          </div>
          <div class="repo bg-white my-1">
            <div>
              <h4>
                <a href="#">Repo Three</a>
              </h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Facilis, consequatur sunt tempora blanditiis ullam voluptatem
                ipsam. Accusantium nobis atque quaerat distinctio, sapiente,
                reiciendis natus perspiciatis maiores delen iti explicabo illum
                mollitia.
              </p>
            </div>
            <div>
              <ul>
                <li class="badge badge-primary">Stars: 44</li>
                <li class="badge badge-primary">Watchers: 20</li>
                <li class="badge badge-primary">Forks: 25</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Profile.propTypes = {};

export default Profile;
