import { isPictureExtension, urlNotValid } from '../util/util';

import { expect } from 'chai';
import 'mocha';

describe('check if string has proper picture prefix', () => {

  it('should check if string has jpg suffix', () => {
    const url = "dog.jpg";
    const result = isPictureExtension(url);
    expect(result).to.be.ok;
  });

  it('should check if string has jpeg suffix', () => {
    const url = "dog.jpeg";
    const result = isPictureExtension(url);
    expect(result).to.be.ok;
  });

  it('should check if string has png suffix', () => {
    const url = "dog.png";
    const result = isPictureExtension(url);
    expect(result).to.be.ok;
  });

  it('should check if string does not have \"picture\" suffix', () => {
    const url = "dog";
    const result = isPictureExtension(url);
    expect(result).to.be.not;
  });

});

describe('check if string is a proper url', () => {

  it('should check if string with jpg suffix is proper url', () => {
    const url = "http://www.onet.pl/dog.jpg";
    const result = urlNotValid(url);
    expect(result).to.be.not;
  });

  it('should check if string without picture suffix is not proper picture url', () => {
    const url = "http://www.onet.pl/dog";
    const result = urlNotValid(url);
    expect(result).to.be.ok;
  });

  it('should check if string with protocol not provided is not proper picture url', () => {
    const url = "www.onet.pl/dog";
    const result = urlNotValid(url);
    expect(result).to.be.ok;
  });

});