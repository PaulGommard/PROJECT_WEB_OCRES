import axios from "axios";

export default class ApiProfile {
    getAllProfiles() {
        return axios
        .get("http://localhost:3000/profiles", {crossdomain: true})
    }

    deleteProfile(name) {
        axios.delete(`http://localhost:3000/profiles/${name}`, {crossdomain: true})
    }

    createProfile(profile) {
        return axios
        .post("http://localhost:3000/profiles", profile, {crossdomain: true})
    }

    updateProfile(profile) {
        return axios
        .put(`http://localhost:3000/profiles/${profile.lastName}`, profile, {crossdomain: true})
    }
}