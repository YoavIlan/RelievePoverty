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
    pip3 install flask         && \
    pip3 install flask_sqlalchemy    && \
    pip3 install flask_restless && \
    pip3 install requests        && \
    pip3 install mock   && \
    pip3 install patch  && \
    pip3 install pymysql    && \
    pip list

CMD bash
