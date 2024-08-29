import { LitElement, html } from 'lit';
import '../../../../sass/dashboard.scss';
import '../../../../sass/main.scss';

class StoryCard extends LitElement {
  static properties = {
    storyRecord: { type: Object },
  };

  constructor() {
    super();
    this.storyRecord = {};
  }

  createRenderRoot() {
    return this;
  }

  // Function to format the date
  formatDate(dateString) {
    const date = new Date(dateString);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('id-ID', options).format(date);
  }

  render() {
    const { name, photoUrl, description, createdAt, id } = this.storyRecord;

    return html`
      <div class="card">
        <img src="${photoUrl}" class="card-img-top" alt="${name}" />

        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <h5 class="card-title" style="color:red">${this.formatDate(createdAt)}</h5>
          <p class="card-text">${description}</p>
          <a class="btn btn-sm btn-warning" href="/story/edit.html?id=${id}">
            <i class="bi bi-pen-fill me-1"></i>Edit
          </a>
        </div>
      </div>
    `;
  }
}

customElements.define('story-card', StoryCard);
