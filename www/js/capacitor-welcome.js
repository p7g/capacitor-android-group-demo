window.customElements.define(
  "capacitor-welcome",
  class extends HTMLElement {
    constructor() {
      super();

      Capacitor.Plugins.SplashScreen.hide();

      const root = this.attachShadow({ mode: "open" });

      root.innerHTML = `
    <style>
      :host {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        display: block;
        width: 100%;
        height: 100%;
      }
      h1, h2, h3, h4, h5 {
        text-transform: uppercase;
      }
      .button {
        display: inline-block;
        padding: 10px;
        background-color: #73B5F6;
        color: #fff;
        font-size: 0.9em;
        border: 0;
        border-radius: 3px;
        text-decoration: none;
        cursor: pointer;
      }
      main {
        padding: 15px;
      }
      main hr { height: 1px; background-color: #eee; border: 0; }
      main h1 {
        font-size: 1.4em;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
      main h2 {
        font-size: 1.1em;
      }
      main h3 {
        font-size: 0.9em;
      }
      main p {
        color: #333;
      }
      main pre {
        white-space: pre-line;
      }
    </style>
    <div>
      <capacitor-welcome-titlebar>
        <h1>Capacitor</h1>
      </capacitor-welcome-titlebar>
      <main>
        <p>
          Capacitor makes it easy to build powerful apps for the app stores, mobile web (Progressive Web Apps), and desktop, all
          with a single code base.
        </p>
        <h2>Getting Started</h2>
        <p>
          You'll probably need a UI framework to build a full-featured app. Might we recommend
          <a target="_blank" href="http://ionicframework.com/">Ionic</a>?
        </p>
        <p>
          Visit <a href="http://ionic-team.github.io/capacitor">ionic-team.github.io/capacitor</a> for information
          on using native features, building plugins, and more.
        </p>
        <a href="http://ionic-team.github.io/capacitor" target="_blank" class="button">Read more</a>
        <h2>Tiny Demo</h2>
        <p>
          Send a few notifications with a group name and then send a group summary
        </p>
        <label>
          Group name
          <input type="text" id="group-name" placeholder="some group name" />
        </label>
        <p>
          <button class="button" id="send-notification">Send notification</button>
        </p>
        <p>
          <button class="button" id="send-summary">Send group summary</button>
        </p>
        <p>
          <img id="image" style="max-width: 100%">
        </p>
      </main>
    </div>
    `;
    }

    connectedCallback() {
      const self = this;

      self.shadowRoot
        .querySelector("#send-notification")
        .addEventListener("click", function() {
          const { LocalNotifications } = Capacitor.Plugins;

          const group =
            self.shadowRoot.querySelector("#group-name").value || null;

          LocalNotifications.schedule({
            notifications: [
              {
                id: (Math.random() * 100000) | 0,
                title: `Notification with group '${group}'`,
                body: "Notification body text",
                group
              }
            ]
          });
        });

      function fnv1a(string) {
        let hash = 2166136261;

        string.split("").forEach(char => {
          hash ^= char.charCodeAt(0);
          hash *= 16777619;
        });

        return hash;
      }

      self.shadowRoot
        .querySelector("#send-summary")
        .addEventListener("click", function() {
          const { LocalNotifications } = Capacitor.Plugins;

          const group =
            self.shadowRoot.querySelector("#group-name").value || null;

          LocalNotifications.schedule({
            notifications: [
              {
                id: group ? fnv1a(group) : 0,
                title: `Group summary of group '${group}'`,
                body: "Notification body text",
                groupSummary: true,
                group
              }
            ]
          });
        });
    }
  }
);

window.customElements.define(
  "capacitor-welcome-titlebar",
  class extends HTMLElement {
    constructor() {
      super();
      const root = this.attachShadow({ mode: "open" });
      root.innerHTML = `
    <style>
      :host {
        position: relative;
        display: block;
        padding: 15px 15px 15px 15px;
        text-align: center;
        background-color: #73B5F6;
      }
      ::slotted(h1) {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        font-size: 0.9em;
        font-weight: 600;
        color: #fff;
      }
    </style>
    <slot></slot>
    `;
    }
  }
);
