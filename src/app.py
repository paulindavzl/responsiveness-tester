from flask import Flask, render_template

app = Flask(__name__)

@app.route("/responsiveness-tester")
def responsive():
    return render_template("index.html")
    
@app.route("/website-simulator")
def website_simulator():
    return render_template("simulator-test.html")
    
if __name__ == "__main__":
    app.run()