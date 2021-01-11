import React, {Component} from "react";
import logo from "./logo.svg";
import "./App.css";

class ResponseData {
    [key: string]: any;
}

type DiveState = {
  response: ResponseData | null
}

class Dive extends Component<Record<string, never>, DiveState> {

    static handleErrors (response: Response): ResponseData | null {

        if (!response.ok) {

            throw Error(response.statusText);

        } else {

            return response.json();

        }

    }


    getServerResponse (): void {

        fetch(
            "http://localhost:9000/api",
            {"mode": "cors"}
        ).
            then(Dive.handleErrors).
            then((data) => {

                this.setState({"response": data});

            }).
            catch((err) => console.log(err));

    }

    componentDidMount () {

        this.getServerResponse();

    }

    render (): JSX.Element {

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
          Edit <code>src/App.tsx</code> and save to do something.
                    </p>
                    <p>
                        { JSON.stringify(
                            this.state?.response,
                            null,
                            "\t"
                        ) }
                    </p>

                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
          Learn React
                    </a>
                </header>
            </div>
        );

    }

}

export default Dive;
