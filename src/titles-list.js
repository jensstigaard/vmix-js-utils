/**
 * Created by Jens on 07-07-2017.
 */

import xpath from 'xpath'
import InputMapper from './input-mapper'

const wantedAttributes = ['key', 'title']

export default function (xmlContent) {
    let inputsXML = xpath.select("//vmix/inputs/input[@type=\"Xaml\"]", xmlContent)
    let titleInputs = InputMapper.mapInputs(inputsXML, wantedAttributes)

    return titleInputs
}