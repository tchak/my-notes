import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import fetch from 'fetch';
import ENV from 'my-notes/config/environment';

export default class extends Service {
  @tracked notes = [];
  @tracked token = localStorage.getItem('AUTH_TOKEN');

  get url() {
    return `${ENV.API_HOST}/notes`;
  }

  get headers() {
    return {
      authorization: `Bearer ${this.token}`,
    };
  }

  async setToken(token) {
    localStorage.setItem('AUTH_TOKEN', token);
    this.token = token;

    if (token) {
      await this.fetchNotes();
    }
  }

  async fetchNotes() {
    if (this.token) {
      const response = await fetch(this.url, {
        headers: this.headers,
      });

      if (response.ok) {
        this.notes = await response.json();
      } else {
        this.token = null;
        this.notes = [];
      }
    }

    return this;
  }

  async removeNote(id) {
    if (this.token) {
      const response = await fetch(`${this.url}/${id}`, {
        method: 'DELETE',
        headers: this.headers,
      });

      if (response.ok) {
        await this.fetchNotes();
      }
    }

    return this;
  }
}
