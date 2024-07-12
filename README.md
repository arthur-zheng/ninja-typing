# Ninja Typing
Intelligent typing site that helps you master your typing skills effortlessly.

# Features
Auto generated dynamic practises. Intelligently auto adjust level ot help you fastly master typing.

# ~/backend
Where backend python code is.
### Local Setup:

1. Install Python using Homebrew and verify installation:
```
$ brew install python
$ which python
/opt/homebrew/opt/python@3.12/libexec/bin/python
```

2. If you are not using VS Code or its IDE plugin, follow these steps to create and activate a virtual environment (venv):
```
$ python3 -m venv .venv
$ source .venv/bin/activate
```

3. Install Python packages required by your project (if building the project for the first time)
```
$ pip install -r requirements.txt
```

4. Run the FastAPI application using uvicorn:
```
$ (.venv) uvicorn backend.main:app --reload
INFO:     Will watch for changes in these directories: ['/Repo/backend']
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
...
INFO:     Application startup complete.
```

# ~/client
Where frontend code is. See `~/client/readme` for more info

