FROM python:3

RUN apt-get update            && \
    apt-get -y install vim

RUN pip install --upgrade pip && \
    pip --version             && \
    pip install black         && \
    pip install coverage      && \
    pip install mypy          && \
    pip install numpy         && \
    pip install pylint        && \
    pip install flask         && \
    pip install flask_sqlalchemy    && \
    pip install flask_restless && \
    pip install requests        && \
    pip list

CMD bash
